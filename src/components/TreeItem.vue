<template>
    <li>
        <div @click="toggle">
            <span>{{ !props.reverse ? tree.productCode : tree.materialCode }}</span>
            <span class="ms-3">{{ !props.reverse ? tree.productName : tree.materialName }}</span>
            <span class="ms-3">{{ tree.materialType }}</span>
            <span v-if="isTree">[{{ isOpen ? '-' : '+' }}]</span>
        </div>
        <ul v-if="isTree" v-show="isOpen" class="ms-5">
            <TreeItem v-for="tree in tree.trees" class="cursor-pointer" :tree="tree" :reverse="props.reverse" />
        </ul>
    </li>
</template>

<script setup>
const props = defineProps({
    tree: Object,
    reverse: Boolean,
});

const isOpen = ref(false);

const isTree = computed(() => {
    return props.tree.trees && props.tree.trees.length;
});

const toggle = () => {
    isOpen.value = !isOpen.value;
};
</script>