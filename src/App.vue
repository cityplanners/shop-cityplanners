<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>
<template>
  <SiteHeader />
  <main id="main" tabindex="-1"><RouterView /></main>
  <SiteFooter />
</template>
