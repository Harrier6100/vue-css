<template>
    <div class="container mx-auto">
        <h1>{{ t('menu.translations-new') }}</h1>
        <Form ref="form" :isSpinning="isSpinning" @save="onSave" @cancel="onCancel" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useQuery } from '@/composables/useQuery';
import { useLoading } from '@/composables/useLoading';
import { useSpinning } from '@/composables/useSpinning';
import { useToast } from '@/composables/useToast';
import { errorHandler } from '@/composables/useErrorHandler';
import { api } from '@/api/api';
import Form from './_form.vue';

const { t } = useI18n();
const router = useRouter();
const { getQuery } = useQuery();
const { startLoading, stopLoading } = useLoading();
const { isSpinning, execute } = useSpinning();
const { addToast } = useToast();

const form = ref();

const onSave = async (data) => {
    startLoading();
    try {
        await execute(async () => {
            await api.post(`/api/translations`, data);
            addToast(t('toast.translations.save'), 'success');
            form.value?.restore?.();
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