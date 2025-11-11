<template>
    <label
        :class="labelClass"
    >
        <slot></slot>
    </label>
</template>

<script setup>
const labelClass = computed(() => {
    const classes = [
        'text-gray-700'
    ];

    return classes;
});
</script>