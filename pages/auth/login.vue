<template>
  <div class="min-h-screen flex items-center justify-center bg-[#09090B] py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="mt-7 bg-[#18181B] border border-[#26272A] rounded-xl shadow-2xs">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <div class="pb-3 flex items-center justify-center ">
              <NuxtLink to="" class="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-hidden "
                aria-label="PWAtop">
                <p class=" text-white font-bold text-2xl flex">
                  <IconsLogo class="mx-1" /> 
                </p>
              </NuxtLink>
              <div class="hidden lg:block ms-2">
              </div>
            </div>
          </div>

          <div class="mt-5">
            <button type="button"
              class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-[#26272A] bg-[#18181B] text-white shadow-2xs hover:bg-[#27272A] focus:outline-hidden focus:bg-[#27272A] disabled:opacity-50 disabled:pointer-events-none">
              <IconsTelegram class="w-6 h-6" />
              Войти при помощи Яндекс
            </button>

            <div
              class="py-3 flex items-center text-xs text-[#717177] uppercase before:flex-1 before:border-t before:border-[#26272A] before:me-6 after:flex-1 after:border-t after:border-[#26272A] after:ms-6">
              или</div>

            <form @submit.prevent="sendData" method="post">
              <div class="grid gap-y-4">
                <div>
                  <label for="email" class="block text-sm mb-2 text-white">Почта</label>
                  <InputGroup>
                    <InputText id="email" name="email" v-model="email" placeholder="Введите вашу почту"
                      class="!bg-[#18181B] !border-[#26272A] !text-white !placeholder-[#717177] focus:!border-[#2563EB] focus:!ring-[#2563EB]"
                      required aria-describedby="email-error" type="email" />
                  </InputGroup>
                  <p v-if="errorBoolen && errorField === 'email'" class="text-xs text-red-600 mt-2" id="email-error">{{ error }}</p>
                </div>
                <div>
                  <div class="flex flex-wrap justify-between items-center gap-2 mb-2">
                    <label for="password" class="block text-sm text-white">Пароль</label>
                  </div>
                  <InputGroup>
                    <Password id="password" name="password" v-model="password" placeholder="Введите ваш пароль"
                      class="!bg-[#18181B] !border-[#26272A] !text-white !placeholder-[#717177] focus:!border-[#2563EB] focus:!ring-[#2563EB]"
                      :feedback="false" toggleMask required aria-describedby="password-error" />
                  </InputGroup>
                  <p v-if="errorBoolen && errorField === 'password'" class="text-xs text-red-600 mt-2" id="password-error">{{ error }}</p>
                </div>
                <Button type="submit" label="Войти"
                  class="!bg-[#2563EB] !border-[#2563EB] hover:!bg-[#1D4ED8] hover:!border-[#1D4ED8] focus:!bg-[#1D4ED8] focus:!border-[#1D4ED8]"
                  :loading="loading" />
                <p v-if="errorBoolen && errorField === 'auth'" class="text-xs text-red-600 mt-2">{{ error }}</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
layout: false,
middleware: 'auth'
})
</script>

<script>
import { useCookie } from "#app";
import { api as useApiStore } from "@/store/api";

export default {
    data() {
        return {
            email: "",
            password: "",
            error: "",
            errorBoolen: false,
            errorField: "",
            loading: false,
        };
    },
    setup() {
        let api = useApiStore();
        return { api };
    },
    methods: {
        async sendData() {
            this.error = "";
            this.errorBoolen = false;
            this.errorField = "";
            if (!this.email) {
                this.error = "Введите email";
                this.errorBoolen = true;
                this.errorField = "email";
                return;
            }
            if (!this.password || this.password.length < 8) {
                this.error = "Пароль должен быть не менее 8 символов";
                this.errorBoolen = true;
                this.errorField = "password";
                return;
            }
            this.loading = true;
            try {
                const result = await $fetch(`${this.api.url}api/v1/sign-in/email-password/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email: this.email,
                        password: this.password,
                    }
                });
                
                let accessToken = useCookie("access_token", {
                    maxAge: 60 * 60 * 24,
                });
                let refreshToken = useCookie("refresh_token", {
                    maxAge: 60 * 60 * 24 * 7,
                });
              accessToken.value = result.data.access_token;
              refreshToken.value = result.data.refresh_token;
              this.$router.push("/panel");
            } catch (error) {
                this.errorBoolen = true;
                this.errorField = "auth";
                this.error = error.data?.description || error.message || "Ошибка авторизации";
            } finally {
                this.loading = false;
            }
        },
    },
};
</script>

<style scoped>
:deep(.p-inputgroup-addon) {
  background-color: #26272A !important;
  border-color: #26272A !important;
  color: #717177 !important;
}

:deep(.p-inputtext) {
  background-color: #18181B !important;
  border-color: #26272A !important;
  color: white !important;
}

:deep(.p-inputtext::placeholder) {
  color: #717177 !important;
}

:deep(.p-inputtext:focus) {
  border-color: #2563EB !important;
  box-shadow: 0 0 0 1px #2563EB !important;
}

:deep(.p-password-input) {
  background-color: #18181B !important;
  border-color: #26272A !important;
  color: white !important;
}

:deep(.p-password-input::placeholder) {
  color: #717177 !important;
}

:deep(.p-password-input:focus) {
  border-color: #2563EB !important;
  box-shadow: 0 0 0 1px #2563EB !important;
}

:deep(.p-checkbox) {
  border-color: #26272A !important;
}

:deep(.p-checkbox:not(.p-disabled):hover) {
  border-color: #2563EB !important;
}

:deep(.p-checkbox .p-checkbox-box.p-highlight) {
  background-color: #2563EB !important;
  border-color: #2563EB !important;
}

:deep(.p-button) {
  background-color: #2563EB !important;
  border-color: #2563EB !important;
}

:deep(.p-button:hover) {
  background-color: #1D4ED8 !important;
  border-color: #1D4ED8 !important;
}

:deep(.p-button:focus) {
  background-color: #1D4ED8 !important;
  border-color: #1D4ED8 !important;
  box-shadow: 0 0 0 1px #2563EB !important;
}
</style>