<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import Tr from '@/i18n/translation'

</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">
                    {{ $t('nav.home') }}
                </RouterLink>
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">
                    {{ $t('nav.cv') }}
                </RouterLink>
                <RouterLink :to="Tr.i18nRoute({ name: 'home' })">
                    {{ $t('nav.projects') }}
                </RouterLink>
                <RouterLink :to="Tr.i18nRoute({ name: 'about' })">
                    {{ $t('nav.about') }}
                </RouterLink>
            </nav>
            <LanguageSwitcher />
        </div>
    </header>

    <RouterView />
</template>

<style scoped></style>
