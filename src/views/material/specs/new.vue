<template>
    <div class="container mx-auto">
        <h1 class="mb-3">{{ t('menu.material_specs-new') }}</h1>
        <Form ref="form" :isSpinning="isSpinning" @save="onSave" @cancel="onCancel" />
    </div>
</template>

<script setup>
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