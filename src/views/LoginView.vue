<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import TextInput from '@/components/TextInput.vue';
import { useRouter } from 'vue-router';
import useAuthStore from '@/store/AuthStore';

const router = useRouter()
const authStore = useAuthStore()

const login = async () => {
    if (!authStore.credentials.email || !authStore.credentials.password) {
        return alert('Please fill out all required fields.')
    }
    const error = await authStore.login()

    if (error) {
        return alert(error)
    }

    router.push({ name: 'home' })
}
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div
            class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
            <form>
                <h2 class="text-3xl text-center font-semibold mb-6">Log In</h2>

                <TextInput v-model="authStore.credentials.email" inputName="email" label="Email" inputType="email" placeholder="company@mail.com" :required="true" />

                <TextInput v-model="authStore.credentials.password" inputName="password" inputType="password" placeholder="password" :required="true" />

                <div>
                    <button
                    @click.prevent="login"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    LogIn
                    </button>
                </div>
            </form>
            </div>
        </div>
    </section>
</template>