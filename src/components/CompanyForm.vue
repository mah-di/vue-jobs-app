<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import TextInput from '@/components/TextInput.vue';
import TextArea from '@/components/TextArea.vue';
import { defineProps } from 'vue';

defineProps({
    company: Object,
    isSignup: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <h3 class="text-2xl mb-5">Company Info</h3>
    
    <TextInput v-model="company.name" inputName="company" placeholder="Company Name" :required="true" />
    
    <TextArea v-model="company.description" name="company_description" label="Company Description" placeholder="What does your company do?" :required="true" />
    
    <TextInput v-model="company.contactEmail" inputName="contact_email" label="Contact Email" inputType="email" placeholder="company@mail.com" :required="true" />
    
    <TextInput v-model="company.contactPhone" inputName="contact_phone" label="Contact Phone" inputType="tel" placeholder="Optional phone for applicants" />

    <template v-if="isSignup">
        <h3 class="text-2xl mb-5">Sign Up Credentials</h3>
        
        <TextInput v-model="company.credentials.email" inputName="email" label="Email" inputType="email" placeholder="company@mail.com" :required="true" />
        
        <TextInput v-model="company.credentials.password" inputName="password" inputType="password" placeholder="password" :required="true" />
    </template>

    <template v-else>
        <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2"
        >Email</label
        >
        <input
        :value="company.credentials.email"
        id="email"
        name="email"
        class="border rounded w-full py-2 px-3"
        disabled
        />
    </div>
    </template>

</template>