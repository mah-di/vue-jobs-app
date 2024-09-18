<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import TextInput from '@/components/TextInput.vue';
import TextArea from '@/components/TextArea.vue';
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

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
        
        router.push({ name: 'home' })
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
        
                <h3 class="text-2xl mb-5">Company Info</h3>
                
                <TextInput v-model="company.name" inputName="company" placeholder="Company Name" :required="true" />
                
                <TextArea v-model="company.description" name="company_description" label="Company Description" placeholder="What does your company do?" :required="true" />
                
                <TextInput v-model="company.contactEmail" inputName="contact_email" label="Contact Email" inputType="email" placeholder="company@mail.com" :required="true" />
                
                <TextInput v-model="company.contactPhone" inputName="contact_phone" label="Contact Phone" inputType="tel" placeholder="Optional phone for applicants" />
        
                <h3 class="text-2xl mb-5">Sign Up Credentials</h3>
                
                <TextInput v-model="company.credentials.email" inputName="email" label="Email" inputType="email" placeholder="company@mail.com" :required="true" />
                
                <TextInput v-model="company.credentials.password" inputName="password" inputType="password" placeholder="password" :required="true" />
        
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