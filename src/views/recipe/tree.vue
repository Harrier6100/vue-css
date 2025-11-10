<template>
    <div class="container mx-auto">
        <form @submit.prevent="onSearch">
            <div class="flex gap-3 mb-3">
                <Input type="text" v-model="form.code" />
                <Button variant="primary" type="submit">{{ t('button.search') }}</Button>
            </div>
        </form>
        <ul>
            <TreeItem class="cursor-pointer" :tree="tree" :reverse="true"></TreeItem>
        </ul>
    </div>
</template>

<script setup>
import { api } from '@/api/api';

const { t } = useI18n();

const form = ref({
    code: '',
});

const tree = ref({});

const onSearch = async () => {
    try {
        const isReverse = true;
        const response = await api.get(`/api/recipe/traces/reverse`, { params: form.value });
        const key = isReverse ? 'materialCode' : 'productCode';
        tree.value = {
            [key]: form.value.code,
            // trees: recursive(response.data, form.value.code)
            trees: reverse(response.data, form.value.code)
        };
    } catch (error) {
    } finally {
    }
};

const recursive = (data, code) => {
    const trees = [];
    for (const row of data) {
        if (row.materialCode && row.materialCode === code) {
            const nodes = recursive(data, row.productCode);
            const node = row;
            if (nodes.length > 0) {
                node.trees = nodes;
            }
            trees.push(node);
        }
    }
    return trees;
};

const reverse = (data, code) => {
    const trees = [];
    for (const row of data) {
        if (row.productCode && row.productCode === code) {
            const nodes = reverse(data, row.materialCode);
            const node = row;
            if (nodes.length > 0) {
                node.trees = nodes;
            }
            trees.push(node);
        }
    }
    return trees;
};
</script>