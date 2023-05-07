<script setup lang="ts">
import { useI18n } from "vue-i18n"
import Tr from "@/i18n/translation"

const { t, locale } = useI18n()

const supportedLocales = Tr.supportedLocales

async function switchLanguage(event:any): Promise<void> { // <--- 1
    const newLocale = event.target.value // <--- 2
    await Tr.switchLanguage(newLocale) // <--- 3
}

</script>

<template>
    <select @change="switchLanguage">
        <option v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`"
            :value="sLocale" :selected="locale === sLocale">
            {{ t(`locale.${sLocale}`) }}
        </option>
    </select>
</template>
