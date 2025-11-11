<template>
    <th :class="{ 'cursor-pointer': props.sortKey }" @click="sort">
        <slot></slot>
        <span v-if="props.orderBy && props.orderBy(props.sortKey)?.asc"><i class="fa fa-arrow-up"></i></span>
        <span v-if="props.orderBy && props.orderBy(props.sortKey)?.desc"><i class="fa fa-arrow-down"></i></span>
    </th>
</template>

<script setup>
const props = defineProps({
    sortKey: String,
    sortBy: Function,
    orderBy: Function,
});

const sort = () => {
    if (props.sortBy) {
        props.sortBy(props.sortKey);
    }
};
</script>