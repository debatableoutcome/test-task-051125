<script setup lang="ts">
import "./assets/scss/base.scss";
import { onMounted } from "vue";
import { useThemeStore } from "./stores/theme";
const theme = useThemeStore();
onMounted(() => theme.init());
import Calendar from "./components/Calendar.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
</script>

<template>
  <main class="page">
    <Calendar />
    <ThemeSwitch />
  </main>
</template>

<style scoped>
.page {
  padding: 2.4rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;
}
</style>
