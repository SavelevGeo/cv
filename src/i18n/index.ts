import { createI18n } from "vue-i18n";

const messages = {
    en: {
        name: 'Georgij Savelev',
        locale: {
            en: "English",
            ru: "Russian"
        },
    },
    ru: {
        name: 'Георгий Савельев',
        locale: {
            en: "Английский",
            ru: "Русский"
        }
    }
}

export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages
})
