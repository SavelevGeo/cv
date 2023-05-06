import { createI18n } from "vue-i18n";

const messages = {
    en: {
        name: 'Georgij Savelev'
    },
    ru: {
        name: 'Георгий Савельев'
    }
}

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
    legacy: false, // <--- 3,
    globalInjection: true,
    messages
})
