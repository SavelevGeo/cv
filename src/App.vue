<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'

interface localeJson {
    [key: string]: string | localeJson;
}

function addNestedValues(obj: localeJson, key: string, value: string) {
    if (key.includes('.')) {
        const [parentKey, childKey] = key.split('.')

        if (!Object.keys(obj).includes(parentKey))
            obj[parentKey] = {}

        obj[parentKey][childKey] = value

    } else obj[key] = value
}

function tsvToJson(tsv: string): localeJson {
    const en: localeJson = {}
    const ru: localeJson = {}

    for (let line of tsv.split('\r\n').slice(1)) {
        const [key, enValue, ruValue] = line.split('\t')

        addNestedValues(en, key, enValue)
        addNestedValues(ru, key, ruValue)
    }

    return { en, ru }
}

const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTvdaFvqr6gxdixvsKGtL6B7YbKxTeEuV3h2P-9xelyw8Q0uorxO_Shqos8IDT-FOZ616LmRnhtCEju/pub?gid=0&single=true&output=tsv'

fetch(sheetUrl)
    .then(resp => resp.text())
    .then(text => console.log(tsvToJson(text)))

</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">Home
                </RouterLink>
                <RouterLink :to="Tr.i18nRoute({ name: 'about' })">About
                </RouterLink>
            </nav>
            <LanguageSwitcher />
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
