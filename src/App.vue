<script setup lang="ts">
import "./assets/scss/base.scss";
import { onMounted } from "vue";
import { useThemeStore } from "./stores/theme";
import Calendar from "./components/Calendar.vue";
import ThemeSwitch from "./components/ThemeSwitch.vue";
import DateField from "./components/DateField.vue";

const theme = useThemeStore();
onMounted(() => theme.init());
</script>

<template>
  <main class="page">
    <div class="page__container">
      <div class="page__header">
        <div class="page__col"><DateField /></div>
        <div class="page__col"><ThemeSwitch /></div>
      </div>
      <Calendar />
    </div>
  </main>
</template>

<style scoped lang="scss">
.page {
  padding: 2.4rem;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;

  &__container {
    width: 32.5rem;
  }

  &__header {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 1.2rem;
    width: 100%;
  }

  &__col {
    flex: 0 0 calc(50% - 0.6rem);
    min-width: 0;
  }
}
</style>
