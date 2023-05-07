import i18n from "@/i18n";
import { nextTick } from "vue"

const Trans = {
    get defaultLocale() {
        return import.meta.env.VITE_DEFAULT_LOCALE
    },

    get currentLocale() {
        return i18n.global.locale.value
    },

    i18nRoute(to: { params: any; }) {
        return {
            ...to,
            params: {
                locale: Trans.currentLocale,
                ...to.params
            }
        }
    },

    isLocaleSupported(locale: any): any {
        return Trans.supportedLocales.includes(locale)
    },

    getUserLocale(): any {
        const locale = window.navigator.language ||
            window.navigator.userLanguage ||
            Trans.defaultLocale
        return {
            locale: locale,
            localeNoRegion: locale.split('-')[0]
        }
    },

    getPersistedLocale() {
        const persistedLocale = localStorage.getItem("user-locale")
        if (Trans.isLocaleSupported(persistedLocale)) {
            return persistedLocale
        } else {
            return null
        }
    },

    guessDefaultLocale(): any {
        const userPersistedLocale = Trans.getPersistedLocale()
        if (userPersistedLocale) {
            return userPersistedLocale
        }
        const userPreferredLocale = Trans.getUserLocale()
        if (Trans.isLocaleSupported(userPreferredLocale.locale)) {
            return userPreferredLocale.locale
        }
        if (Trans.isLocaleSupported(userPreferredLocale.localeNoRegion)) {
            return userPreferredLocale.localeNoRegion
        }

        return Trans.defaultLocale
    },

    get supportedLocales() {
        return import.meta.env.VITE_SUPPORTED_LOCALES.split(",")
    },

    set currentLocale(newLocale: any) {
        i18n.global.locale.value = newLocale
    },

    async switchLanguage(newLocale: string) {
        await Trans.loadLocaleMessages(newLocale)
        Trans.currentLocale = newLocale
        document.querySelector("html").setAttribute("lang", newLocale)
        localStorage.setItem("user-locale", newLocale)
    },

    async loadLocaleMessages(locale: string) {
        if(!i18n.global.availableLocales.includes(locale)) { 
          const messages = await import(`@/i18n/locales/${locale}.json`) 
          i18n.global.setLocaleMessage(locale, messages.default) 
        }
        
        return nextTick()
    },

    async routeMiddleware(to: { params: { locale: any; }; }, _from: any, next: (arg0: undefined) => any): Promise<any> {
        const paramLocale = to.params.locale
        if (!Trans.isLocaleSupported(paramLocale)) {
            return next(Trans.guessDefaultLocale())
        }
        await Trans.switchLanguage(paramLocale)
        return next()
    },
}

export default Trans
