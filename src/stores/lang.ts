import { defineStore } from "pinia";

export type Lang = "en" | "ru" | "de" | "es";

export const useLangStore = defineStore("lang", {
  state: () => ({
    current: "en" as Lang,
    dict: {
      en: {
        theme: "Theme",
        language: "Language",
        themeOptions: {
          neutral: "Neutral",
          pastel: "Pastel",
          contrast: "Contrast",
        },
      },
      ru: {
        theme: "Тема",
        language: "Язык",
        themeOptions: {
          neutral: "Нейтральный",
          pastel: "Пастельный",
          contrast: "Контрастный",
        },
      },
      de: {
        theme: "Thema",
        language: "Sprache",
        themeOptions: {
          neutral: "Neutral",
          pastel: "Pastell",
          contrast: "Kontrast",
        },
      },
      es: {
        theme: "Tema",
        language: "Idioma",
        themeOptions: {
          neutral: "Neutro",
          pastel: "Pastel",
          contrast: "Contraste",
        },
      },
    },
  }),
  getters: {
    t: (s) => s.dict[s.current],
  },
  actions: {
    setLang(l: Lang) {
      this.current = l;
    },
  },
});
