<script setup lang="ts">
import { computed } from "vue";
import { useThemeStore, type ThemeName } from "../stores/theme";
import { useLangStore } from "../stores/lang";

const theme = useThemeStore();
const lang = useLangStore();

const model = computed({
  get: () => theme.current,
  set: (v) => theme.setTheme(v as ThemeName),
});

const opts = computed(() => [
  { value: "neutral", label: lang.t.themeOptions.neutral },
  { value: "pastel", label: lang.t.themeOptions.pastel },
  { value: "contrast", label: lang.t.themeOptions.contrast },
]);
</script>

<template>
  <div class="theme-switch">
    <label class="theme-switch__label">
      <span class="theme-switch__title">{{ lang.t.theme }}</span>
      <select class="theme-switch__select" v-model="model">
        <option v-for="o in opts" :key="o.value" :value="o.value">
          {{ o.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.theme-switch {
  width: 18rem;
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
    width: 100%;
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
