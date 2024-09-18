<script setup>
import { defineProps } from 'vue';

defineProps({
    cardTitle: String,
    cardBody: String,
    link: Object,
    linkText: String,
    wrapperClasses: Array,
    linkClasses: Array
})
</script>

<template>
    <div class="bg-gray-100 p-6 rounded-lg shadow-md" :class="wrapperClasses">
        <h2 class="text-2xl font-bold">{{ cardTitle }}</h2>
        <p class="mt-2 mb-4">
            {{ cardBody }}
        </p>
        <router-link
            :to="link"
            class="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            :class="linkClasses"
        >
            {{ linkText }}
        </router-link>
    </div>
</template>