<template>
    <input
        :class="inputClass"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
    >
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text',
    },
    modelValue: String,
    placeholder: String,
});

const inputClass = computed(() => {
    const classes = [
        'px-1 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300'
    ];

    return classes;
});
</script>