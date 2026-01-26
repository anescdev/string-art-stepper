import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from 'i18next-http-backend'
import { initReactI18next } from "react-i18next";
i18next
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        fallbackLng: "en",
        debug: true,
        ns: ['ns1'],
        defaultNS: "ns1",
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            retryTimeout: 500,
            maxRetries: 2
        }
    })
export default i18next;