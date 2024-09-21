<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CompanyForm from '@/components/CompanyForm.vue';

const router = useRouter()
const company = reactive({
    name: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    credentials: {
        email: '',
        password: ''
    }
})

const signup = async () => {
    if (!company.name || !company.description || !company.contactEmail || !company.contactPhone || !company.credentials.email || !company.credentials.password) {
        return alert('Please fill out all required fields.')
    }

    try {
        await axios.post('http://localhost:5000/companies', company)
        
        router.push({ name: 'login' })
    } catch (error) {
        console.error(error)
    }
}
</script>

<template>
    <section class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div
            class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
            <form>
                <h2 class="text-3xl text-center font-semibold mb-6">Sign Up</h2>
        
                <CompanyForm :company="company" :isSignup="true" />
        
                <div>
                    <button
                    @click.prevent="signup"
                    class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                    type="submit"
                    >
                    SignUp
                    </button>
                </div>
            </form>
            </div>
        </div>
    </section>
</template>