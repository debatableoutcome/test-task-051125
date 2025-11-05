<script setup lang="ts">
import { ref, computed } from "vue";

type Locale = "en" | "ru";

const locale = ref<Locale>("en");
const locales = {
  en: {
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  ru: {
    months: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ],
    weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  },
} as const;

const now = new Date();
const currentMonth = ref(now.getMonth());
const currentYear = ref(now.getFullYear());

const monthName = computed(
  () => locales[locale.value].months[currentMonth.value]
);
const weekdayNames = computed(() => locales[locale.value].weekdays);

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}
</script>

<template>
  <section class="calendar">
    <header class="calendar__header">
      <button
        class="calendar__nav calendar__nav--prev"
        type="button"
        aria-label="Previous month"
        @click="prevMonth"
      >
        ‹
      </button>

      <div class="calendar__title">{{ monthName }} {{ currentYear }}</div>

      <button
        class="calendar__nav calendar__nav--next"
        type="button"
        aria-label="Next month"
        @click="nextMonth"
      >
        ›
      </button>
    </header>

    <div class="calendar__controls">
      <label class="calendar__label">
        <span class="calendar__small">Language</span>
        <select class="calendar__select" v-model="locale">
          <option value="en">en</option>
          <option value="ru">ru</option>
        </select>
      </label>
    </div>

    <div class="calendar__grid">
      <div class="calendar__row calendar__row--head">
        <div
          v-for="w in weekdayNames"
          :key="w"
          class="calendar__cell calendar__cell--head"
        >
          {{ w }}
        </div>
      </div>

      <div class="calendar__placeholder">Calendar grid will be here</div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.calendar {
  width: 30rem;
  border: 0.1rem solid #e5e7eb;
  border-radius: 0.8rem;
  padding: 1.2rem;
  background: #fff;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
  }

  &__title {
    font-weight: 600;
    font-size: 1.6rem;
  }

  &__nav {
    width: 2.8rem;
    height: 2.8rem;
    border: none;
    background: transparent;
    cursor: pointer;
    font-size: 1.8rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &--prev {
    }
    &--next {
    }
  }

  &__controls {
    display: flex;
    gap: 1.2rem;
    margin-bottom: 0.8rem;
  }

  &__label {
    display: flex;
    flex-direction: column;
    font-size: 1.2rem;
  }

  &__small {
    opacity: 0.7;
    margin-bottom: 0.4rem;
    font-size: 1.2rem;
  }

  &__select {
    padding: 0.4rem 0.6rem;
    border: 0.1rem solid #e5e7eb;
    border-radius: 0.6rem;
    font-size: 1.4rem;
    background: #fff;
  }

  &__grid {
    user-select: none;
  }

  &__row {
    display: flex;

    &--head {
      margin-bottom: 0.6rem;
    }
  }

  &__cell {
    width: 3.6rem;
    height: 3.6rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &--head {
      font-weight: 600;
      color: #6b7280;
      font-size: 1.2rem;
    }
  }

  &__placeholder {
    padding: 1.6rem;
    font-size: 1.2rem;
    color: #9ca3af;
  }
}
</style>
