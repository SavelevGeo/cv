<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'

interface localeJson {
    [key: string]: string | localeJson;
}

function nestJson(nestKey: string): localeJson {
    
    return { nestKey: nestKey } 
}

function tsvToJson(tsv: string): localeJson {
    const en: localeJson = {}
    const ru: localeJson = {}

    for (let line of tsv.split('\r\n').slice(1)) {
        const [key, enValue, ruValue] = line.split('\t')

        if (key.includes('.')) 
            en[key] = nestJson(key)
         else en[key] = enValue

        console.log([key, enValue, ruValue])
    }
    return en
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
