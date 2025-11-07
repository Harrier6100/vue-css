<template>
    <div class="container mx-auto">
        <h1 class="mb-3">{{ t('menu.translations') }}</h1>
        <div class="mb-3">
            <div class="flex gap-3 mb-3">
                <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" v-model="keyword">
                <button class="cursor-pointer" @click="createTranslation" :disabled="isLoading">{{ t('button.create') }}</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <TableHeader sortKey="id" :sortBy :orderBy>{{ t('label.translations.id') }}</TableHeader>
                        <TableHeader :sortKey="'translations.' + locale" :sortBy :orderBy>{{ t('label.translations.translations') }}</TableHeader>
                        <TableHeader sortKey="created_at" :sortBy :orderBy>{{ t('label.created_at') }}</TableHeader>
                        <TableHeader sortKey="created_by" :sortBy :orderBy>{{ t('label.created_by') }}</TableHeader>
                        <TableHeader sortKey="updated_at" :sortBy :orderBy>{{ t('label.updated_at') }}</TableHeader>
                        <TableHeader sortKey="updated_by" :sortBy :orderBy>{{ t('label.updated_by') }}</TableHeader>
                        <TableHeader></TableHeader>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <div v-if="isLoading">Loading...</div>
                    <tr v-for="translation in paginatedData" :key="translation.id">
                        <td class="px-2 py-2 whitespace-nowrap">{{ translation.id }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">{{ translation.translations?.[locale] }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">{{ getDateTime(translation.createdAt) }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">{{ translation.createdBy }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">{{ getDateTime(translation.updatedAt) }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">{{ translation.updatedBy }}</td>
                        <td class="px-2 py-2 whitespace-nowrap">
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
    </div>
</template>

<script setup>
import { useQuery } from '@/composables/useQuery';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useConfirm } from '@/composables/useConfirm';
import { useDataTable } from '@/composables/useDataTableQuery';
import { errorHandler } from '@/composables/useErrorHandler';
import { getDateTime } from '@/utils/formatDateTime';
import { api } from '@/api/api';

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