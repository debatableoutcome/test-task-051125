<script setup lang="ts">
import Calendar from "./components/Calendar.vue";
</script>

<template>
  <main class="page">
    <h1 class="page__title">Test Calendar</h1>
    <Calendar />
  </main>
</template>

<style scoped>
.page {
  padding: 2.4rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}
.page__title {
  margin-bottom: 1.6rem;
  font-size: 2rem;
  font-weight: 600;
}
</style>
