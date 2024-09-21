<script setup lang="ts">
import JobForm from '@/components/JobForm.vue';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

const route = useRoute()
const router = useRouter()
const state = reactive({
    job: {},
    isLoading: true
})

onMounted(async () => {
    try {
        const data = await axios.get(`http://localhost:5000/jobs/${route.params.id}`)
        Object.assign(state.job, data.data)
    } catch (error) {
        console.error(error)
    } finally {
        state.isLoading = false
    }
})

const updateJob = async () => {
    const toast = useToast()
    try {
        await axios.put(`http://localhost:5000/jobs/${state.job.id}`, state.job)
        toast.success('Job updated successfully!!!')
        router.push({name: 'jobDetails', params: {id: state.job.id}})
    } catch (error) {
        console.error(error)
        toast.error('Job was not updated...')
    }
}

</script>

<template>
    <section class="bg-green-50">
      <div class="container m-auto max-w-2xl py-24">
        <div
          class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
        >
          <div v-if="state.isLoading" class="">
            <PulseLoader />
          </div>
          <JobForm v-else formType="Edit" :job="state.job" @form-submit="updateJob" />
         </div>
      </div>
    </section>
</template>