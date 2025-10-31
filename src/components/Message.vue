<template>
    <div v-if="isShow" :class="classes">
        {{ message }}
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    error: String,
});

const isShow = computed(() => {
    return props.error;
});

const message = computed(() => {
    return props.error;
});

const classes = computed(() => {
    const classList = ['text-sm'];

    if (props.error) {
        classList.push('text-red-500');
    }

    return classList;
});
</script>