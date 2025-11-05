import { defineStore } from "pinia";

export type ThemeName = "neutral" | "pastel" | "contrast";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    current: "neutral" as ThemeName,
  }),
  actions: {
    init() {
      const saved = localStorage.getItem("theme") as ThemeName | null;
      if (saved) this.current = saved;
      document.documentElement.setAttribute("data-theme", this.current);
    },
    setTheme(name: ThemeName) {
      this.current = name;
      localStorage.setItem("theme", name);
      document.documentElement.setAttribute("data-theme", name);
    },
  },
});
