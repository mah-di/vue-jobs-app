<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    'modelValue': String,
    'options': Array,
    'name': String,
    'label': String,
    'required': {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="mb-4">
        <label :for="name" class="block text-gray-700 font-bold mb-2"
        >{{ label }}</label
        >
        <select
        :value="modelValue"
        :id="name"
        :name="name"
        class="border rounded w-full py-2 px-3"
        :required="required"
        @change="$emit('update:modelValue', $event.target.value)"
        >
        <option selected value="">Select An Option</option>
        <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
    </div>
</template>