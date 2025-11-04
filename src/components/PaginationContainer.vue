<template>
    <div>
        <button class="cursor-pointer disabled:pointer-events-none disabled:text-gray-400" @click="emit('update:page', props.page - 1)" :disabled="props.page === 1">←</button>
        <template v-for="(page, index) in pages" :key="page === '...' ? page + '-' + index : page">
            <button v-if="page === '...'" :disabled="true">...</button>
            <button v-if="page !== '...'" class="cursor-pointer disabled:pointer-events-none disabled:text-gray-400" @click="emit('update:page', page)" :disabled="page === props.page">{{ page }}</button>
        </template>
        <button class="cursor-pointer disabled:pointer-events-none disabled:text-gray-400" @click="emit('update:page', props.page + 1)" :disabled="props.page >= props.pageLength">→</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    page: {
        type: Number,
        default: 1,
    },
    pageLength: {
        type: Number,
        default: 0,
    },
});
const emit = defineEmits(['update:page']);

const pages = computed(() => {
    const pageList = [];
    const page = props.page;
    const pageLength = props.pageLength;

    if (pageLength <= 7) {
        for (let p=1; p<=pageLength; p++) {
            pageList.push(p);
        }
    } else if (page <= 4) {
        pageList.push(1, 2, 3, 4, 5, '...', pageLength);
    } else if (page >= (pageLength - 3)) {
        pageList.push(1, '...', pageLength - 4, pageLength - 3, pageLength - 2, pageLength - 1, pageLength);
    } else {
        pageList.push(1, '...', page - 1, page, page + 1, '...', pageLength);
    }

    return pageList;
});
</script>