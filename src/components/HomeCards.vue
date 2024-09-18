<script setup>
import SingleCard from './SingleCard.vue';

</script>

<template>
    <section class="py-4">
      <div class="container-xl lg:container m-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <SingleCard cardTitle="For Developers" cardBody="Browse our Vue jobs and start your career today" :link="{name: 'jobs'}" linkText="Browse Jobs" />
          <SingleCard cardTitle="For Employers" cardBody="List your job to find the perfect developer for the role" :link="{name: 'addJob'}" linkText="Add Job" :wrapperClasses="['bg-green-100']" :linkClasses="['bg-green-500', 'hover:bg-green-600']" />
        </div>
      </div>
    </section>
</template>