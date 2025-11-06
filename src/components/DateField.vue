<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLangStore } from "../stores/lang";
import { useDateStore } from "../stores/date";

const i18n = useLangStore();
const date = useDateStore();

const inner = ref(date.selected);

const value = computed({
  get: () => inner.value,
  set: (v) => (inner.value = v),
});

function onInput(e: Event) {
  const t = e.target as HTMLInputElement;
  const digits = t.value.replace(/\D+/g, "").slice(0, 8);
  let out = "";
  if (digits.length <= 4) out = digits;
  else if (digits.length <= 6) out = `${digits.slice(0, 4)}-${digits.slice(4)}`;
  else out = `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
  value.value = out;
}

const invalid = computed(() => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.value);
  if (!m) return value.value.length > 0;
  const y = +m[1],
    mm = +m[2],
    d = +m[3];
  if (mm < 1 || mm > 12) return true;
  const dim = new Date(y, mm, 0).getDate();
  return d < 1 || d > dim;
});

function onSubmit() {
  if (!invalid.value && value.value) date.set(value.value);
}

watch(
  () => date.selected,
  (v) => {
    if ((v || "") !== inner.value) inner.value = v || "";
  }
);
</script>

<template>
  <form class="date-field" @submit.prevent="onSubmit">
    <label class="date-field__label">
      <span class="date-field__title">{{ i18n.t.date }}</span>
      <input
        class="date-field__input"
        :class="{ 'date-field__input--invalid': invalid }"
        :placeholder="i18n.t.datePlaceholder"
        :value="value"
        @input="onInput"
        inputmode="numeric"
        autocomplete="off"
        maxlength="10"
      />
      <span class="date-field__hint">YYYY-MM-DD</span>
    </label>

    <button
      class="date-field__btn"
      type="submit"
      :aria-label="i18n.t.apply"
      :disabled="invalid"
    >
      <svg class="date-field__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM10.2 15.6l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4-6 6z"
        />
      </svg>
    </button>
  </form>
</template>

<style lang="scss" scoped>
.date-field {
  display: flex;
  gap: 0.8rem;
  width: 100%;
  align-items: center;

  &__label {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  &__title {
    font-size: 1.2rem;
    color: var(--color-muted);
  }
  &__input {
    width: 90%;
    padding: 0.6rem 0.8rem;
    border: 0.1rem solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow);
    font-size: 1.4rem;
    outline: none;
  }
  &__input--invalid {
    border-color: #ef4444;
  }

  &__hint {
    font-size: 1.1rem;
    color: var(--color-muted);
  }

  &__btn {
    flex: 0 0 3rem;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-accent);
    color: #fff;
    box-shadow: var(--shadow);
    cursor: pointer;
    transition: transform 0.06s ease, opacity 0.2s ease, box-shadow 0.2s ease;
  }
  &__btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &__btn:not(:disabled):active {
    transform: translateY(0.1rem);
  }

  &__icon {
    width: 1.8rem;
    height: 1.8rem;
    fill: currentColor;
  }
}
</style>
