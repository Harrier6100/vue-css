<template>
    <div class="container mx-auto">
        <h1 class="mb-3">{{ t('menu.translations') }}</h1>
        <div class="mb-3">
            <div class="flex gap-3 mb-3">
                <Input type="text" v-model="keyword" />
                <Button variant="primary" @click="createTranslation" :disabled="isLoading">{{ t('button.create') }}</Button>
            </div>
            <table>
                <thead>
                    <tr>
                        <Th sortKey="id" :sortBy :orderBy>{{ t('label.translations.id') }}</Th>
                        <Th :sortKey="'translations.' + locale" :sortBy :orderBy>{{ t('label.translations.translations') }}</Th>
                        <Th sortKey="created_at" :sortBy :orderBy>{{ t('label.created_at') }}</Th>
                        <Th sortKey="created_by" :sortBy :orderBy>{{ t('label.created_by') }}</Th>
                        <Th sortKey="updated_at" :sortBy :orderBy>{{ t('label.updated_at') }}</Th>
                        <Th sortKey="updated_by" :sortBy :orderBy>{{ t('label.updated_by') }}</Th>
                        <Th></Th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <div v-if="isLoading">Loading...</div>
                    <tr v-for="translation in paginatedData" :key="translation.id">
                        <Td>{{ translation.id }}</Td>
                        <Td>{{ translation.translations?.[locale] }}</Td>
                        <Td>{{ getDateTime(translation.createdAt) }}</Td>
                        <Td>{{ translation.createdBy }}</Td>
                        <Td>{{ getDateTime(translation.updatedAt) }}</Td>
                        <Td>{{ translation.updatedBy }}</Td>
                        <Td>
                            <div class="flex gap-3">
                                <Button @click="editTranslation(translation.id)">{{ t('button.edit') }}</Button>
                                <Button @click="deleteTranslation(translation.id)">{{ t('button.delete') }}</Button>
                            </div>
                        </Td>
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