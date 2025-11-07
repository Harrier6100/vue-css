<template>
    <teleport to="body">
        <div v-for="toast in toasts" :key="toast.id">
            <div>{{ toast.message }}</div>
            <button @click="removeToast(toast.id)"></button>
        </div>
    </teleport>
</template>

<script setup>
import { useToast } from '@/composables/useToast';

const { toasts, addToast, removeToast } = useToast();
</script>