<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import JobCard from './JobCard.vue';
import { computed, inject, onMounted, reactive, watch } from 'vue';
import axios from 'axios';

const componentToBeLoaded = inject('componentToBeLoaded')
const companyId = inject('companyId')

const state = reactive({
    jobs: [],
    start: 0,
    isLoading: true,
})

const showLoadMoreButton = computed(() => state.jobs.length < state.start ? false : true)

const loadJobs = async () => {
    state.isLoading = true
    try {
        const data = await axios.get(`http://localhost:5000/jobs?_start=${state.start}&_limit=6&companyId=${companyId.value}`)
        state.jobs.push(...data.data) 
        state.start += 6
    } catch (error) {
        console.error(error)
    } finally {
        state.isLoading = false
    }
}

onMounted(async () => loadJobs())

watch(componentToBeLoaded, () => {
    if (componentToBeLoaded.listing) {
        state.jobs = []
        state.start = 0
        state.isLoading = true
        loadJobs()
        componentToBeLoaded.listing = false
    }
})
</script>

<template>
    <section class="bg-green-50 py-10">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobCard v-for="job in state.jobs" :key="job.id" :job="job" />
        </div>
        <button v-if="showLoadMoreButton && !state.isLoading" @click="loadJobs" class="block w-full bg-black text-white text-center py-3 mt-10 rounded-xl hover:bg-gray-700">Load More</button>
      </div>
    </section>

    <section v-if="state.isLoading" class="m-auto text-center max-w-lg my-10 px-6">
      <PulseLoader />
    </section>
</template>