<script setup>
import { onMounted, reactive, watch } from 'vue';
import JobCard from './JobCard.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const props = defineProps({
  limit: {
    type: Number,
    default: 12
  },
  filters: {
    type: Object,
    default: () => ({ type: null, salary: null }),
  },
  showAllJobsButton: {
    type: Boolean,
    default: false
  }
})

const state = reactive({
  jobs : [],
  start: 0,
  isLoading: true,
  showLoadMoreButton: true
})

const loadJobs = async () => {
  try {
    let url = `http://localhost:5000/jobs?_start=${state.start}&_limit=${props.limit}`

    if (props.filters.type) {
      url += `&type=${encodeURI(props.filters.type)}`
    }

    if (props.filters.salary) {
      url += `&salary=${encodeURI(props.filters.salary)}`
    }

    const data = await axios.get(url)
  
    state.jobs.push(...data.data)

    if (data.data.length < props.limit) {
      state.showLoadMoreButton = false
    } else {
      state.showLoadMoreButton = true
    }
  
    state.start += props.limit
  } catch (error) {
    console.error(error)    
  } finally {
    state.isLoading = false
  }
}

onMounted(async () => loadJobs())

if (!props.showAllJobsButton) {
  watch(props.filters , () => {
    state.jobs = []
    state.start = 0
    loadJobs()
  })
}
</script>

<template>
    <section class="bg-green-50 px-4 py-10">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
          Browse Jobs
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <JobCard v-for="job in state.jobs" :key="job.id" :job="job" />
        </div>
        <button v-if="!showAllJobsButton && state.showLoadMoreButton" @click="loadJobs" class="block w-full bg-black text-white text-center py-3 mt-10 rounded-xl hover:bg-gray-700">Load More</button>
      </div>
    </section>

    <section v-if="state.isLoading" class="m-auto text-center max-w-lg my-10 px-6">
      <PulseLoader />
    </section>

    <section v-if="showAllJobsButton" class="m-auto max-w-lg my-10 px-6">
      <router-link
        :to="{name: 'jobs'}"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</router-link
      >
    </section>
</template>