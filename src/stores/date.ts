import { defineStore } from "pinia";

const fmt = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
};

export const useDateStore = defineStore("date", {
  state: () => ({
    selected: fmt(new Date()),
  }),
  actions: {
    set(v: string) {
      this.selected = v;
    },
    setToday() {
      this.selected = fmt(new Date());
    },
  },
});
