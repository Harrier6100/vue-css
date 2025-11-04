<template>
    <NavigationMenu />
    <router-view />
    <ToastContainer />
    <ConfirmModal />
</template>

<script setup>
import NavigationMenu from '@/components/NavigationMenu.vue';
import ToastContainer from '@/components/ToastContainer.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
</script>