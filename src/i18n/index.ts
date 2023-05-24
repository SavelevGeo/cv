import { createI18n } from "vue-i18n";
import getLocales from './localesFromGSheet';


export default createI18n({
    locale: import.meta.env.VITE_DEFAULT_LOCALE,
    fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages: await getLocales
})
