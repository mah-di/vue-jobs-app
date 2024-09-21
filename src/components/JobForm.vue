<!-- eslint-disable vue/no-mutating-props -->
<script setup>
import { defineProps } from 'vue';
import TextInput from './TextInput.vue';
import TextArea from './TextArea.vue';
import SelectOption from './SelectOption.vue';

defineProps({
    formType: String,
    job: Object
})

defineEmits(['formSubmit'])
</script>

<template>
    <form>
        <h2 class="text-3xl text-center font-semibold mb-6">{{ formType }} Job</h2>

        <SelectOption v-model="job.type" name="type" label="Job Type" :options="['Full-Time', 'Part-Time', 'Remote', 'Internship']" :required="true" />

        <TextInput v-model="job.title" inputName="title" placeholder="Job Title" :required="true" />

        <TextArea v-model="job.description" name="description" label="Description" placeholder="Add any job duties, expectations, requirements, etc" />

        <SelectOption v-model="job.salary" name="salary" label="Salary" :options="['Under $50K', '$50K - $60K', '$50K - $60K', '$70K - $80K', '$80K - $90K', '$90K - $100K', '$100K - $125K', '$125K - $150K', '$150K - $175K', '$175K - $200K', 'Over $200K']" :required="true" />

        <TextInput v-model="job.location" inputName="location" placeholder="Job Location" :required="true" />

        <div>
            <button
            @click.prevent="$emit('formSubmit')"
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
            >
            {{ formType }} Job
            </button>
        </div>
    </form>
</template>