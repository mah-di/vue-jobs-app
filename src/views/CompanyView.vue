<script setup>
import CompanyEditForm from '@/components/CompanyEditForm.vue';
import CompanyInfo from '@/components/CompanyInfo.vue';
import CompanyJobListing from '@/components/CompanyJobListing.vue';
import useAuthStore from '@/store/AuthStore';
import { provide, reactive, ref, shallowRef, watch } from 'vue';
import { onBeforeRouteUpdate,  useRoute } from 'vue-router';

const route = useRoute()
const authStore = useAuthStore()
const tab = shallowRef(CompanyInfo)
const companyId = ref(route.params.id)
const triggerComponentLoad = reactive({
  info: false,
  listing: false
})
const componentToBeLoaded = reactive({
  info: false,
  listing: false
})

provide('companyId', companyId)
provide('componentToBeLoaded', componentToBeLoaded)

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    tab.value = CompanyInfo
    companyId.value = to.params.id
    triggerComponentLoad.info = true
    triggerComponentLoad.listing = true
  }
})

watch([tab, triggerComponentLoad], () => {
  if (tab.value === CompanyInfo && triggerComponentLoad.info) {
    componentToBeLoaded.info = true
    triggerComponentLoad.info = false
  } else if (tab.value === CompanyJobListing && triggerComponentLoad.listing) {
    componentToBeLoaded.listing = true
    triggerComponentLoad.listing = false
  }
})
</script>

<template>
    <section class="bg-green-50">
      <div class="container m-auto py-10 px-6">
          <main>
            <section class="bg-white px-6 rounded-lg shadow-xs">
              <span @click="tab = CompanyInfo" class="py-4 px-6 inline-block cursor-pointer hover:bg-slate-50" :class="tab === CompanyInfo ? ['bg-slate-50', 'text-green-700'] : ''">Company Info</span>
              <span @click="tab = CompanyJobListing" class="py-4 px-6 inline-block cursor-pointer hover:bg-slate-50" :class="tab === CompanyJobListing ? ['bg-slate-50', 'text-green-700'] : ''">Jobs</span>
              <span v-if="authStore.data.id === companyId" @click="tab = CompanyEditForm" class="py-4 px-6 inline-block cursor-pointer hover:bg-slate-50" :class="tab === CompanyEditForm ? ['bg-slate-50', 'text-green-700'] : ''">Edit</span>
            </section>

            <keep-alive>
              <component :is="tab" />
            </keep-alive>
          </main>
      </div>
    </section>
</template>