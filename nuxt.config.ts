import tailwindcss from "@tailwindcss/vite";
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt'
  ],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.p-dark'
        }
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        class: 'p-dark'
      },
      title: 'Гранула - ваш лучший инструмент!',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Создавайте и управляйте PWA приложениями с помощью Palm Panel. Простой и мощный инструмент для разработки прогрессивных веб-приложений.' },
        { name: 'keywords', content: 'PWA, Progressive Web App, веб-приложения, разработка, создание приложений' },
        { name: 'author', content: 'Palm Panel' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'Palm Panel - PWA Builder' },
        { property: 'og:description', content: 'Создавайте и управляйте PWA приложениями с помощью Palm Panel. Простой и мощный инструмент для разработки прогрессивных веб-приложений.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Palm Panel' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Palm Panel - PWA Builder' },
        { name: 'twitter:description', content: 'Создавайте и управляйте PWA приложениями с помощью Palm Panel.' },
        { name: 'theme-color', content: '#16A34A' },
        { name: 'msapplication-TileColor', content: '#16A34A' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Palm Panel' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icon-192.png' },
        { rel: 'manifest', href: '/manifest.json' }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss({
        config: './tailwind.config.js'
      }),
    ],
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  experimental: {
    payloadExtraction: false
  }
});