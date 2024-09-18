<script setup>
import JobListings from '@/components/JobListings.vue';
import SelectOption from '@/components/SelectOption.vue';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const filters = reactive({
    type: route.query.type || null,
    salary: route.query.salary || null
})

const resetFilters = () => {
    filters.type = null
    filters.salary = null
}

watch(filters, () => {
    let query = {}
    
    if (filters.type) {
        query.type = filters.type
    }

    if (filters.salary) {
        query.salary = filters.salary
    }

    router.push({ query: query })
}, { deep: true })
</script>

<template>
    <div class="p-5 bg-white rounded-lg shadow-sm text-center">
      <h3 class="text-2xl font-bold">Filter Jobs</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-80">
        <div>
          <SelectOption v-model="filters.type" name="type_filter" label="By Job Type" :options="['Full-Time', 'Part-Time', 'Remote', 'Internship']" />
        </div>
        <div>
          <SelectOption v-model="filters.salary" name="salary_filter" label="By Salary" :options="['Under $50K', '$50K - $60K', '$60K - $70K', '$70K - $80K', '$80K - $90K', '$90K - $100K', '$100K - $125K', '$125K - $150K', '$150K - $175K', '$175K - $200K', 'Over $200K']" />
        </div>
      </div>
      <div class="flex flex-row justify-center">
        <button @click="resetFilters" class="bg-green-700 text-white text-center py-2 px-6 rounded-xl hover:bg-gray-900">Reset Filters</button>
      </div>
    </div>
    <JobListings :filters="filters" />
</template>