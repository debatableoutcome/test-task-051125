<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore, type ThemeName } from "../stores/theme";
const store = useThemeStore();
const value = computed({
  get: () => store.current,
  set: (v) => store.setTheme(v as ThemeName),
});
</script>

<template>
  <div class="theme-switch">
    <label class="theme-switch__label">
      <span class="theme-switch__title">Theme</span>
      <select class="theme-switch__select" v-model="value">
        <option value="neutral">neutral</option>
        <option value="pastel">pastel</option>
        <option value="contrast">contrast</option>
      </select>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  &__label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  &__title {
    font-size: 1.2rem;
    color: var(--color-muted);
  }
  &__select {
    padding: 0.6rem 0.8rem;
    border: 0.1rem solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow);
    font-size: 1.4rem;
  }
}
</style>
