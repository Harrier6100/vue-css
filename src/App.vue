<template>
    <NavigationMenu />
    <router-view />
    <ToastContainer />
</template>

<script setup>
import NavigationMenu from '@/components/NavigationMenu.vue';
import ToastContainer from '@/components/ToastContainer.vue';
</script>