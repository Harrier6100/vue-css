<template>
    <div class="container mx-auto">
        <h1>{{ t('menu.translations') }}</h1>
        <button class="cursor-pointer" @click="createTranslation" :disabled="isLoading">{{ t('button.create') }}</button>
        <table>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="translation in translations" :key="translation.id">
                    <td>{{ translation.id }}</td>
                    <td>{{ translation.translations[locale] }}</td>
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
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@/composables/useQuery';
import { useLoading } from '@/composables/useLoading';
import { errorHandler } from '@/composables/useErrorHandler';
import { getDateTime } from '@/utils/formatDateTime';
import { api } from '@/api/api';

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { setQuery } = useQuery();
const { isLoading, startLoading, stopLoading } = useLoading();

const translations = ref([]);

onMounted(() => {
    fetchTranslations();
});

const fetchTranslations = async () => {
    try {
        startLoading();
        const response = await api.get(`/api/translations`);
        translations.value = response.data;
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
    try {
        startLoading();
        await api.delete(`/api/translations/${id}`);
        fetchTranslations();
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};
</script>