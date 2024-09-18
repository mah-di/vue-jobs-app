<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    'modelValue': String,
    'name': String,
    'label': {
        type: String,
        default: null
    },
    'placeholder': String,
    'required': {
        type: Boolean,
        default: false
    },
    'rows': {
        type: Number,
        default: 4
    }
})

defineEmits(['update:modelValue'])
</script>

<template>
    <div class="mb-4">
        <label
        :for="name"
        class="block text-gray-700 font-bold mb-2"
        >{{ label ?? placeholder }}</label
        >
        <textarea
        :value="modelValue"
        :id="name"
        :name="name"
        class="border rounded w-full py-2 px-3"
        :rows="rows"
        :placeholder="placeholder"
        :required="required"
        @change="$emit('update:modelValue', $event.target.value)"
        ></textarea>
    </div>
</template>