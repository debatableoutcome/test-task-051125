<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLangStore, type Lang } from "../stores/lang";
import { useDateStore } from "../stores/date";

const props = defineProps<{ modelValue?: string }>();
const emit = defineEmits<{
  "update:modelValue": [v: string];
  select: [v: string];
}>();

const i18n = useLangStore();
const date = useDateStore();

const MAP: Record<Lang, { months: string[]; weekdays: string[] }> = {
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
  de: {
    months: [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ],
    weekdays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  },
  es: {
    months: [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    weekdays: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  },
};

function daysIn(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function fmt(y: number, m: number, d: number) {
  const mm = String(m + 1).padStart(2, "0");
  const dd = String(d).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

const today = new Date();
const monthIdx = ref(today.getMonth());
const yearNum = ref(today.getFullYear());
const picked = ref<{ y: number; m: number; d: number } | null>(null);

const monthTitle = computed(() => MAP[i18n.current].months[monthIdx.value]);
const weekShort = computed(() => MAP[i18n.current].weekdays);

const rows = computed(() => {
  const first = new Date(yearNum.value, monthIdx.value, 1);
  const start = first.getDay();
  const dim = daysIn(yearNum.value, monthIdx.value);
  const prevDim = daysIn(yearNum.value, monthIdx.value - 1);
  const total = Math.ceil((start + dim) / 7) * 7;
  const cells: Array<{
    y: number;
    m: number;
    d: number;
    inMonth: boolean;
    k: string;
  }> = [];
  for (let i = 0; i < total; i++) {
    const off = i - start + 1;
    let y = yearNum.value;
    let m = monthIdx.value;
    let d = 0;
    let inMonth = true;
    if (off <= 0) {
      inMonth = false;
      d = prevDim + off;
      if (m === 0) {
        m = 11;
        y -= 1;
      } else {
        m -= 1;
      }
    } else if (off > dim) {
      inMonth = false;
      d = off - dim;
      if (m === 11) {
        m = 0;
        y += 1;
      } else {
        m += 1;
      }
    } else {
      d = off;
    }
    cells.push({ y, m, d, inMonth, k: fmt(y, m, d) });
  }
  const out: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
  return out;
});

function onPick(cell: { y: number; m: number; d: number }) {
  picked.value = { y: cell.y, m: cell.m, d: cell.d };
  yearNum.value = cell.y;
  monthIdx.value = cell.m;
  const v = fmt(cell.y, cell.m, cell.d);
  date.set(v);
  emit("update:modelValue", v);
  emit("select", v);
}

watch(
  () => date.selected,
  (v) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || "");
    if (!m) return;
    const y = +m[1],
      mm = +m[2] - 1,
      d = +m[3];
    if (mm < 0 || mm > 11) return;
    yearNum.value = y;
    monthIdx.value = mm;
    picked.value = { y, m: mm, d };
  },
  { immediate: true }
);

watch(
  () => props.modelValue,
  (v) => {
    if (!v) return;
    date.set(v);
  },
  { immediate: true }
);
</script>

<template>
  <section class="calendar">
    <header class="calendar__header">
      <button
        class="calendar__nav calendar__nav--prev"
        type="button"
        aria-label="Previous month"
        @click="monthIdx === 0 ? ((monthIdx = 11), yearNum--) : monthIdx--"
      >
        ‹
      </button>
      <div class="calendar__title">{{ monthTitle }} {{ yearNum }}</div>
      <button
        class="calendar__nav calendar__nav--next"
        type="button"
        aria-label="Next month"
        @click="monthIdx === 11 ? ((monthIdx = 0), yearNum++) : monthIdx++"
      >
        ›
      </button>
    </header>

    <div class="calendar__grid">
      <div class="calendar__row calendar__row--head">
        <div
          v-for="w in weekShort"
          :key="w"
          class="calendar__cell calendar__cell--head"
        >
          {{ w }}
        </div>
      </div>
      <div v-for="(week, i) in rows" :key="i" class="calendar__row">
        <button
          v-for="cell in week"
          :key="cell.k"
          type="button"
          class="calendar__cell"
          :class="{
            'calendar__cell--muted': !cell.inMonth,
            'calendar__cell--picked':
              picked &&
              picked.y === cell.y &&
              picked.m === cell.m &&
              picked.d === cell.d,
          }"
          @click="onPick(cell)"
        >
          <span class="calendar__day">{{ cell.d }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.calendar {
  width: 30rem;
  border: 0.1rem solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.2rem;
  background: var(--color-surface);
  box-shadow: var(--shadow);
  color: var(--color-text);

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
    color: var(--color-text);
  }

  &__grid {
    user-select: none;
  }
  &__row {
    display: flex;
    gap: 0.2rem;
    margin-bottom: 0.2rem;
  }
  &__cell {
    width: 3.6rem;
    height: 3.6rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.6rem;
    border: 0.1rem solid transparent;
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
  }
  &__cell--head {
    font-weight: 600;
    color: var(--color-muted);
    font-size: 1.2rem;
    cursor: default;
  }
  &__cell--muted {
    color: var(--color-muted);
  }
  &__cell--picked {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }
  &__day {
    font-size: 1.3rem;
    line-height: 1;
  }
}
</style>
