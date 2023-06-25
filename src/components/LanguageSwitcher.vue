<script setup lang="ts">
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import Tr from "@/i18n/translation"

const { locale } = useI18n()

const supportedLocales: Array<string> = Tr.supportedLocales

const router = useRouter()

async function setNewLocale(newLocale: string): Promise<void> {
    try {
        await router.replace({ params: { locale: newLocale } })
    } catch (e) {
        console.log(e)
        router.push("/")
    }
}

function switchLanguage(event: Event): void {
    if (event.target === null) return undefined
    const target = event.target as HTMLInputElement

    const newLocale: string = target.value
    Tr.switchLanguage(newLocale).then(
        () => setNewLocale(newLocale)
    )
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
