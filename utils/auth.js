import { useCookie } from '#app'
import { api as useApiStore } from '@/store/api'

export const useAuth = () => {
  const accessToken = useCookie('access_token')
  const refreshToken = useCookie('refresh_token')

  const logout = () => {
    accessToken.value = null
    refreshToken.value = null
    navigateTo('/auth/login')
  }

  const isAuthenticated = () => {
    return !!(accessToken.value || refreshToken.value)
  }

  const getUserData = async () => {
    try {
      const api = useApiStore()
      
      const result = await $fetch(`${api.url}api/v1/user/me/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken.value}`,
          'Content-Type': 'application/json'
        }
      })
      
      return result.data
    } catch (error) {
      console.error('Ошибка при загрузке данных пользователя:', error)
      throw error
    }
  }

  return {
    logout,
    isAuthenticated,
    getUserData,
    accessToken,
    refreshToken
  }
}
