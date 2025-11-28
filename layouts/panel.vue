<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useAuth } from '@/utils/auth';
import { onMounted } from 'vue'

onMounted(() => {
    if (window.HSStaticMethods) {
        window.HSStaticMethods.autoInit()
    }
})
const route = useRoute();
const sidebar = ref<HTMLElement | null>(null);
const { logout } = useAuth();

function closeSidebar() {
    if (window.innerWidth < 1024 && sidebar.value) {
        if (window.HSOverlay) {
            window.HSOverlay.close(sidebar.value);
        } else {
            sidebar.value.classList.remove('hs-overlay-open:translate-x-0');
            sidebar.value.classList.add('-translate-x-full');
            sidebar.value.classList.remove('show');
            sidebar.value.setAttribute('aria-hidden', 'true');
        }
    }
}
// закрывает ебучи сайдбар на мобиле при выборе страницы 
</script>

<template>
    <div class="sticky top-0 inset-x-0 z-20  border-y bg-[#09090B] border-[#26272A] px-4 sm:px-6 lg:px-8 lg:hidden">
        <div class="flex items-center py-2">
            <button type="button"
                class="size-9 flex justify-center items-center gap-x-2 border border-[#26272A] text-white hover:text-gray-500 rounded-lg focus:outline-hidden focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none"
                aria-haspopup="dialog" aria-expanded="false" aria-controls="hs-application-sidebar"
                aria-label="Toggle navigation" data-hs-overlay="#hs-application-sidebar">
                <span class="sr-only">Toggle Navigation</span>
                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M15 3v18" />
                    <path d="m8 9 3 3-3 3" />
                </svg>
            </button>
            <ol class="ms-3 flex items-center justify-center w-full whitespace-nowrap">
                <NuxtLink to="/" class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden "
                    aria-label="PWAtop">
                    <p class=" text-white font-bold text-2xl flex">
                        <IconsLogo class="mx-1 fill-current" /> 
                    </p>
                </NuxtLink>
            </ol>
        </div>
    </div>
    <div id="hs-application-sidebar" ref="sidebar" class="hs-overlay  [--auto-close:lg]
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        w-65 h-full
        hidden
        fixed inset-y-0 start-0 z-60
        bg-[#09090B] 
        lg:block lg:translate-x-0 lg:end-auto lg:bottom-0" role="dialog" tabindex="-1" aria-label="Sidebar">
        <div class="relative flex flex-col h-full max-h-full">
            <div class="px-6 pt-4 flex items-center justify-center ">
                <NuxtLink to="/" class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden "
                    aria-label="PWAtop">
                    <p class=" text-white font-bold text-2xl flex">
                        <IconsLogo class="mx-1 fill-current text-white" /> 
                    </p>
                </NuxtLink>
                <div class="hidden lg:block ms-2">
                </div>
            </div>
            <div
                class="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-[#09090B] [&::-webkit-scrollbar-thumb]:bg-[#09090B]">
                <nav class="hs-accordion-group  p-3 w-ful flex flex-col flex-wrap" data-hs-accordion-always-open>
                    <ul class="flex flex-col space-y-2 mt-3 ">
                        <div
                            class="mb-3 ml-2  shrink-0 text-xs font-medium text-[#717177] uppercase whitespace-nowrap truncate transition-[margin,opacity,transform] duration-100 ease-linear [&>svg]:size-4 [&>svg]:shrink-0">
                            Панель
                        </div>
                        <li>
                            <NuxtLink to="/panel"
                                class="group  w-full flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition-all border-l-4 border-transparent"
                                :class="route.path === '/panel' ? 'bg-[#2563EB] text-white' : 'hover:bg-[#27272A] text-[#717177]'"
                                @click="closeSidebar">
                                <IconsHome class="w-5 h-5 text-inherit group-hover:text-primary transition" />
                                <span>Главная</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div class="mt-7 p-3 flex">
                <NuxtLink to="/panel/profile"
                    class="group w-full flex items-center gap-3 px-4 py-2 rounded-full font-medium transition-all border-l-4 border-transparent"
                    :class="route.path === '/panel/profile' ? 'bg-[#2563EB] text-white' : 'hover:bg-[#27272A] text-[#717177]'"
                    @click="closeSidebar">
                    <IconsProfile class="w-5 h-5 text-inherit group-hover:text-primary transition" />
                    <span>Профиль</span>
                </NuxtLink>
                <Button aria-label="eXIT" severity="danger" variant="text" rounded class="text-red-500" @click="logout">
                    <IconsExit />
                </Button>
            </div>
        </div>
    </div>
    <div class="w-full min-h-screen  p-2   lg:ps-65 flex flex-col">
        <div class="bg-[#18181B] flex-1 rounded-4xl flex flex-col border border-[#26272A]">
            <div class="p-4 md:p-6">
                <slot />
            </div>
        </div>
    </div>
</template>