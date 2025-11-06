import { defineStore } from "pinia";

export type Lang = "en" | "ru" | "de" | "es";

export const useLangStore = defineStore("lang", {
  state: () => ({
    current: "en" as Lang,
    dict: {
      en: {
        theme: "Theme",
        language: "Language",
        date: "Date",
        datePlaceholder: "YYYY-MM-DD",
        apply: "Apply",
        themeOptions: {
          neutral: "Neutral",
          pastel: "Pastel",
          contrast: "Contrast",
        },
      },
      ru: {
        theme: "Тема",
        language: "Язык",
        date: "Дата",
        datePlaceholder: "ГГГГ-ММ-ДД",
        apply: "Готово",
        themeOptions: {
          neutral: "Нейтральный",
          pastel: "Пастельный",
          contrast: "Контрастный",
        },
      },
      de: {
        theme: "Thema",
        language: "Sprache",
        date: "Datum",
        datePlaceholder: "JJJJ-MM-TT",
        apply: "OK",
        themeOptions: {
          neutral: "Neutral",
          pastel: "Pastell",
          contrast: "Kontrast",
        },
      },
      es: {
        theme: "Tema",
        language: "Idioma",
        date: "Fecha",
        datePlaceholder: "AAAA-MM-DD",
        apply: "Aplicar",
        themeOptions: {
          neutral: "Neutro",
          pastel: "Pastel",
          contrast: "Contraste",
        },
      },
    },
  }),
  getters: { t: (s) => s.dict[s.current] },
  actions: {
    setLang(l: Lang) {
      this.current = l;
    },
  },
});
