<template>
    <!-- <nav>
        <div class="flex bg-blue-500 gap-1">
            <button class="cursor-pointer" @click="changeLocale('ja')"><span class="fi fi-jp w-6 h-4"></span></button>
            <button class="cursor-pointer" @click="changeLocale('en')"><span class="fi fi-us w-6 h-4"></span></button>
            <button class="cursor-pointer" @click="changeLocale('ko')"><span class="fi fi-kr w-6 h-4"></span></button>
        </div>
    </nav> -->
</template>

<script setup>
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { setLocale } from 'yup';
import { getYupLocale } from '@/i18n/yup';
import 'flag-icons/css/flag-icons.min.css';

const { t, locale } = useI18n();

setLocale(getYupLocale());

watch(locale, (newLocale) => {
    localStorage.setItem('lang', newLocale);
    setLocale(getYupLocale());
});

const changeLocale = (lang) => {
    locale.value = lang;
};
</script>