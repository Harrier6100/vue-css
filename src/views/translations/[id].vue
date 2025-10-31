<template>
    <div class="container mx-auto">
        <h1>{{ t('menu.translations-id') }}</h1>
        <Form :form="form" :isSpinning="isSpinning" @save="onSave" @cancel="onCancel" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@/composables/useQuery';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { errorHandler } from '@/composables/useErrorHandler';
import { api } from '@/api/api';
import Form from './_form.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const { getQuery } = useQuery();
const { startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();

const form = ref({});

onMounted(() => {
    fetchLocale(route.params.id);
});

const fetchLocale = async (id) => {
    try {
        startLoading();
        const response = await api.get(`/api/translations/${id}`);
        form.value = response.data;
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};

const onSave = async (data) => {
    try {
        startLoading();
        await execute(async () => {
            await api.put(`/api/translations/${route.params.id}`, data);
        });
    } catch (error) {
        errorHandler(error);
    } finally {
        stopLoading();
    }
};

const onCancel = () => {
    router.push({
        name: 'translations',
        query: getQuery() ?? {},
    });
};
</script>