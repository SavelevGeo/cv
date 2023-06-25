<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import Tr from "@/i18n/translation"

const { locale } = useI18n()

const supportedLocales = Tr.supportedLocales

const router = useRouter()

async function switchLanguage(event: any): Promise<void> {
    const newLocale = event.target.value
    await Tr.switchLanguage(newLocale)

    try {
        await router.replace({ params: { locale: newLocale } })
    } catch (e) {
        console.log(e)
        router.push("/")
    }
}

</script>

<template>
    <fieldset>
        <label v-for="sLocale in supportedLocales" :key="`locale-${sLocale}`">
            <input @change="switchLanguage" type="radio" :key="`locale-${sLocale}`"
                :value="sLocale" :checked="locale === sLocale" name="locale">
            {{ sLocale }}
        </label>
    </fieldset>
</template>
