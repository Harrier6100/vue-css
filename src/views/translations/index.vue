<template>
    <div class="container mx-auto">
        <h1>{{ t('menu.translations') }}</h1>
        <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" v-model="keyword">
        <button class="cursor-pointer" @click="createTranslation" :disabled="isLoading">{{ t('button.create') }}</button>
        <table>
            <thead>
                <tr>
                    <TableHeader sortKey="id" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.translations.id') }}</TableHeader>
                    <TableHeader :sortKey="'translations.' + locale" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.translations.translations') }}</TableHeader>
                    <TableHeader sortKey="created_at" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.created_at') }}</TableHeader>
                    <TableHeader sortKey="created_by" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.created_by') }}</TableHeader>
                    <TableHeader sortKey="updated_at" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.updated_at') }}</TableHeader>
                    <TableHeader sortKey="updated_by" :sortBy="sortBy" :orderBy="orderBy">{{ t('label.updated_by') }}</TableHeader>
                    <TableHeader></TableHeader>
                </tr>
            </thead>
            <tbody>
                <div v-if="isLoading">Loading...</div>
                <tr v-for="translation in paginatedData" :key="translation.id">
                    <td>{{ translation.id }}</td>
                    <td>{{ translation.translations?.[locale] }}</td>
                    <td>{{ getDateTime(translation.createdAt) }}</td>
                    <td>{{ translation.createdBy }}</td>
                    <td>{{ getDateTime(translation.updatedAt) }}</td>
                    <td>{{ translation.updatedBy }}</td>
                    <td>
                        <div class="flex gap-3">
                            <button class="cursor-pointer" @click="editTranslation(translation.id)">{{ t('button.edit') }}</button>
                            <button class="cursor-pointer" @click="deleteTranslation(translation.id)">{{ t('button.delete') }}</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <PaginationContainer
            v-model:page="page"
            :pageLength="pageLength"
        />
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@/composables/useQuery';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useConfirm } from '@/composables/useConfirm';
import { useDataTable } from '@/composables/useDataTableQuery';
import { errorHandler } from '@/composables/useErrorHandler';
import { getDateTime } from '@/utils/formatDateTime';
import { api } from '@/api/api';
import TableHeader from '@/components/TableHeader.vue';
import PaginationContainer from '@/components/PaginationContainer.vue';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { confirm } = useConfirm();

const translations = ref([]);
const { keyword, page, pageLength, paginatedData, sortBy, orderBy } = useDataTable(translations, 10);

onMounted(() => {
    loadTranslations()
});

watch(keyword, () => {
    page.value = 1
});

const loadTranslations = async () => {
    startLoading();
    try {
        await execute(async () => {
            const response = await api.get('/api/translations');
            translations.value = response.data;
        });
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};

const createTranslation = () => {
    setQuery(route.query);
    router.push({
        name: 'translations-new',
    });
};

const editTranslation = (id) => {
    setQuery(route.query);
    router.push({
        name: 'translations-id',
        params: { id },
    });
};

const deleteTranslation = async (id) => {
    if (!await confirm(t('dialog.delete'))) return;

    startLoading();
    try {
        await execute(async () => {
            await api.delete(`/api/translations/${id}`);
            loadTranslations();
        });
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};
</script>