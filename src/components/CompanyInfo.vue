<script setup>
import axios from 'axios';
import { inject, onMounted, reactive, watch } from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

const companyId = inject('companyId')
const componentToBeLoaded = inject('componentToBeLoaded')

const state = reactive({
    company: {},
    isLoading: true
})

const loadCompany = async () => {
    try {
        const compRes = await axios.get(`http://localhost:5000/companies/${companyId.value}`)
        state.company = compRes.data
    } catch (error) {
        console.error(error)
    } finally {
        state.isLoading = false
    }
}

onMounted(async () => loadCompany())

watch(componentToBeLoaded, () => {
    if (componentToBeLoaded.info) {
        state.company = {}
        state.isLoading = true
        loadCompany()
        componentToBeLoaded.info = false
    }
})
</script>

<template>
    <section v-if="state.isLoading" class="m-auto text-center max-w-lg my-10 px-6">
      <PulseLoader />
    </section>

    <section v-else class="py-10">
        <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <h1 class="text-3xl font-bold mb-4">{{ state.company.name }}</h1>
            <div
            class="text-gray-500 mb-4 sm:flex sm:align-middle sm:justify-start"
            >
            <div>
                <i
                class="pi pi-envelope text-md text-orange-700 mt-[3px] mr-2"
                ></i>
                <span class="text-orange-700">{{ state.company.contactEmail }}</span>
            </div>
            <div v-show="state.company.contactPhone" class="ml-8">
                <i
                class="pi pi-phone text-md text-orange-700 mt-[3px] mr-2"
                ></i>
                <span class="text-orange-700">{{ state.company.contactPhone }}</span>
            </div>
            </div>
        </div>
    
        <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">
            Description
            </h3>
    
            <p class="mb-4">
            {{ state.company.description }}
            </p>
        </div>
    </section>
</template>