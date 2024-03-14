import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nextPlugin } from "translation-check";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(i18nextPlugin)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: ["en"],
    debug: false,
    detection: {
      order: ["localStorage"],
      caches: ["localStorage", "cookie"],
    },
    backend: {
      loadPath: "/translation/{{lng}}/{{ns}}.json",
    },
  });
export default i18next;
