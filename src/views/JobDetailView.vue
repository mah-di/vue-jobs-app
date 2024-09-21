<script setup>
import useAuthStore from '@/store/AuthStore';
import axios from 'axios';
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { useToast } from 'vue-toastification';

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const state = reactive({
    job: {},
    company: {},
    isLoading: true
})

onMounted(async () => {
    try {
        const jobRes = await axios.get(`http://localhost:5000/jobs/${route.params.id}`)
        state.job = jobRes.data
        const compRes = await axios.get(`http://localhost:5000/companies/${state.job.companyId}`)
        state.company = compRes.data
    } catch (error) {
        console.error(error)
    } finally {
        state.isLoading = false
    }
})

const deleteJob = async () => {
    if (authStore.data.id != state.job.companyId) {
      return alert("You don't have permission to delete this job")
    }
    const toast = useToast()
    try {
        if (window.confirm('Are you sure you want to delete this job?')) {
            await axios.delete(`http://localhost:5000/jobs/${state.job.id}`)
            toast.success('Job deleted successfully!!!')
            router.push({name: 'jobs'})
        }
    } catch (error) {
        console.error(error)
        toast.error('Job was not deleted...')
    }
}
</script>

<template>
    <section>
      <div class="container m-auto py-6 px-6">
        <router-link
          :to="{name: 'jobs'}"
          class="text-green-500 hover:text-green-600 flex items-center"
        >
          <i class="pi pi-arrow-circle-left mr-2"></i> Back to Job Listings
        </router-link>
      </div>
    </section>

    <section v-if="state.isLoading" class="m-auto text-center max-w-lg my-10 px-6">
      <PulseLoader />
    </section>

    <section v-else class="bg-green-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  class="pi pi-map-marker text-lg text-orange-700 mr-2"
                ></i>
                <p class="text-orange-700">{{ state.job.location }}</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                {{ state.job.description }}
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4">{{ state.job.salary }} / Year</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl text-sky-900 font-bold">
                <router-link :to="{name: 'company', params: {id: state.company.id}}">{{ state.company.name }}</router-link>
              </h2>

              <p class="my-2">
                {{ state.company.description }}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.company.contactEmail }}
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">{{ state.company.contactPhone }}</p>
            </div>

            <!-- Manage -->
            <div v-if="authStore.data.id == state.job.companyId" class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Job</h3>
              <router-link
                :to="{name: 'editJob', params: {id: state.job.id}}"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</router-link
              >
              <button
              @click="deleteJob()"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
</template>