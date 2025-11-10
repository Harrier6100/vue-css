<template>
    <button
        :class="buttonClass"
        :type="type"
    >
        <slot></slot>
    </button>
</template>

<script setup>
const props = defineProps({
    variant: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'button',
    },
});

const buttonClass = computed(() => {
    const classes = [
        'px-4 py-1 rounded-md cursor-pointer transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none',
    ];

    switch (props.variant) {
        case 'primary':
            classes.push('bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-3 focus-visible:ring-blue-300');
            break;
        default:
            classes.push('active:ring-1');
    };

    return classes;
});
</script>