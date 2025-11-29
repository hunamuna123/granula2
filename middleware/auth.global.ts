import { api } from "@/store/api.js";
import { jwtDecode } from 'jwt-decode'

export default defineNuxtRouteMiddleware(async (to) => {
  const apiStore = api();
  const accessToken = useCookie('access_token', { maxAge: 60 * 60 * 24 });
  const refreshToken = useCookie('refresh_token', { maxAge: 60 * 60 * 24 * 7 });

  // Применяем защиту только для страниц /panel
  const isProtectedRoute = to.path.startsWith('/panel');

  const isAccessExpired = () => {
    try {
      if (!accessToken.value) return true
      const payload: { exp?: number } = jwtDecode(accessToken.value as string)
      if (!payload?.exp) return false
      return payload.exp * 1000 <= Date.now()
    } catch {
      return false
    }
  }

  // Редирект с логина если уже авторизован
  if (to.path === '/auth/login' && accessToken.value && refreshToken.value) {
    return navigateTo('/panel');
  }

  // Для незащищённых роутов - пропускаем остальные проверки
  if (!isProtectedRoute) {
    return;
  }

  // Рефреш токена если нужно
  if ((isAccessExpired() || !accessToken.value) && refreshToken.value) {
    try {
      const data = await $fetch(`${apiStore.url}api/v1/refresh/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          token_refresh: refreshToken.value
        }
      });

      if (data.data) {
        accessToken.value = data.data.access_token;
        refreshToken.value = data.data.refresh_token;
        return;
      }
    } catch (error) {
      console.error('Ошибка при обновлении токена:', error);
    }
  }

  // Редирект на логин если нет токена
  if (!accessToken.value || isAccessExpired()) {
    return navigateTo('/auth/login');
  }
}); 