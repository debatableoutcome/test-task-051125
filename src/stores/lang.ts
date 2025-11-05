import { defineStore } from "pinia";

export type Lang = "en" | "ru" | "de" | "es";

export const useLangStore = defineStore("lang", {
  state: () => ({
    current: "en" as Lang,
    dict: {
      en: { theme: "Theme", language: "Language" },
      ru: { theme: "Тема", language: "Язык" },
      de: { theme: "Thema", language: "Sprache" },
      es: { theme: "Tema", language: "Idioma" },
    },
  }),
  getters: {
    t: (state) => state.dict[state.current],
  },
  actions: {
    setLang(l: Lang) {
      this.current = l;
    },
  },
});
