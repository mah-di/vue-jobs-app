<script setup>
import JobListings from '@/components/JobListings.vue';
import HeroSection from '@/components/HeroSection.vue';
import HomeCards from '@/components/HomeCards.vue';
</script>

<template>
    <HeroSection />
    <HomeCards />
    <JobListings :limit="3" :show-all-jobs-button="true" />
</template>