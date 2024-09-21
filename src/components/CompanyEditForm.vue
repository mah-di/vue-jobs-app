<script setup>
import { inject, onMounted, reactive } from 'vue';
import CompanyForm from './CompanyForm.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const companyId = inject('companyId')
const componentToBeLoaded = inject('componentToBeLoaded')

const state = reactive({
    company: {},
    isLoading: true
})

onMounted(async () => {
    try {
        const data = await axios.get(`http://localhost:5000/companies/${companyId.value}`)
        Object.assign(state.company, data.data)
    } catch (error) {
        console.error(error)
    } finally {
        state.isLoading = false
    }
})

const updateCompany = async () => {
    const toast = useToast()
    try {
        await axios.put(`http://localhost:5000/companies/${companyId.value}`, state.company)
        componentToBeLoaded.info = true
        toast.success('Company information updated successfully!!!')
    } catch (error) {
        console.error(error)
        toast.error('Company information was not updated...')
    } finally {
        state.isLoading = false
    }
}

const update = async () => {
    state.isLoading = true

    await updateCompany()
}
</script>

<template>
    <section v-if="state.isLoading" class="m-auto text-center max-w-lg my-10 px-6">
        <PulseLoader />
    </section>

    <section v-else class="bg-green-50">
        <div class="container m-auto max-w-2xl py-10">
            <div
            class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
            >
                <form>
                    <h2 class="text-3xl text-center font-semibold mb-6">Update Company Info</h2>
                    
                    <CompanyForm :company="state.company" />

                    <div>
                        <button
                        @click.prevent="update"
                        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                        type="submit"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>