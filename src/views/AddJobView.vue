<script setup>
import JobForm from '@/components/JobForm.vue';
import useAuthStore from '@/store/AuthStore';
import axios from 'axios';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter()
const authStore = useAuthStore()
const job = reactive({
  type: 'Full-Time',
  title: '',
  description: '',
  location: '',
  salary: '',
  companyId: authStore.data.id
})

const addJob = async () => {
  if (!job.type || !job.title || !job.description || !job.location || !job.salary) {
      return alert('Please fill out all required fields.')
  }

  const toast = useToast()
  try {
      const data = await axios.post('http://localhost:5000/jobs', job)
      toast.success('Job added successfully!!!')
      router.push({name: 'jobDetails', params: {id: data.data.id}})
  } catch (error) {
      console.error(error)
      toast.error('Job was not added...')
  }
}
</script>

<template>
  <section class="bg-green-50">
    <div class="container m-auto max-w-2xl py-24">
      <div
        class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
      >
        <JobForm formType="Add" :job="job" @update-job="addJob" />
        </div>
    </div>
  </section>
</template>