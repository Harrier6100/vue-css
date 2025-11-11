<template>
    <td :class="tdClass">
        <slot></slot>
    </td>
</template>

<script setup>
const tdClass = computed(() => {
    const classes = [
        'p-2 whitespace-nowrap'
    ];

    return classes;
});
</script>