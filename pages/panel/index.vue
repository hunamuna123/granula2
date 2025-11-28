<template>
    <div v-if="loading">
      <SkeletonHome />
    </div>
    
    <div v-else-if="error" class="min-h-screen  ">
      <div class=" mx-auto">
        <div class="bg-[#18181B] border border-[#26272A] rounded-xl p-6">
          <h1 class="text-2xl font-bold text-white mb-6">Главная страница</h1>
          <div class="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mb-4">
            <p class="text-red-400">{{ error }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else-if="user" class="min-h-screen  ">
      <div class=" mx-auto">
        <div class="bg-[#18181B] border border-[#26272A] rounded-xl p-6">
          <h1 class="text-2xl font-bold text-white mb-6">Главная страница</h1>
          
          <div class="space-y-4">
            <div class="bg-[#26272A] rounded-lg p-4">
              <h2 class="text-lg font-semibold text-white mb-2">
                Добро пожаловать, {{ user.full_name || user.email }}!
              </h2>
              <p class="text-gray-300">Вы успешно аутентифицированы в системе.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
definePageMeta({
  layout: 'panel'
})
</script>

<script>
import { useAuth } from '@/utils/auth'

export default {
    data() {
      return {
        user: null,
        loading: true,
        error: null
      }
    },
    setup() {
      const { getUserData } = useAuth()
      return { getUserData }
    },
    async mounted() {
      await this.loadUserData()
    },
    methods: {
      async loadUserData() {
        try {
          this.loading = true
          this.error = null
          
          this.user = await this.getUserData()
        } catch (error) {
          this.error = error.message || 'Произошла ошибка при загрузке данных'
        } finally {
          this.loading = false
        }
      }
    }
  }
  </script>