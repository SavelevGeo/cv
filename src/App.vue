<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'

import locales from './locales';

</script>

<template>
    <p>{{ locales }}</p>
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
