<template>
    <form @submit.prevent="onSave" autocomplete="off">
        <div class="mb-3">
            <label class="text-gray-700" for="id">{{ t('label.translations.id') }}</label>
            <Input type="text" v-model="form.id" />
            <Message :error="errors.id" />
        </div>
        <div class="mb-3">
            <label class="text-gray-700">{{ t('label.translations.translations') }}</label>
            <div class="flex gap-3 mb-3">
                <label><i class="fi fi-jp w-4 h-4"></i></label>
                <Input type="text" v-model="form.translations.ja" />
            </div>
            <div class="flex gap-3 mb-3">
                <label><i class="fi fi-us w-4 h-4"></i></label>
                <Input type="text" v-model="form.translations.en" />
            </div>
            <div class="flex gap-3 mb-3">
                <label><i class="fi fi-kr w-4 h-4"></i></label>
                <Input type="text" v-model="form.translations.ko" />
            </div>
        </div>
        <Button variant="primary" type="submit" :disabled="isLoading">
            <span v-if="props.isSpinning"></span>{{ t('button.save') }}
        </Button>
        <Button type="button" @click="emit('cancel')">{{ t('button.back') }}</Button>
    </form>
</template>

<script setup>
import * as yup from 'yup';
import { useLoading } from '@/composables/useLoading';
import { useValidate } from '@/composables/useValidate';

const props = defineProps({
    form: Object,
    isSpinning: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits(['save', 'cancel']);

const { t } = useI18n();
const { isLoading } = useLoading();
const { errors, validate, withLabel } = useValidate();

const schema = yup.object({
    id: withLabel('label.translations.id', yup.string().required()),
});

const formRestore = () => ({
    id: '',
    translations: {
        ja: '',
        en: '',
        ko: '',
    },
});
const form = ref(formRestore());

watch(() => props.form, (data) => {
    if (data) {
        form.value = { ...formRestore(), ...data };
    }
}, { immediate: true });

const onSave = async () => {
    const isValid = await validate(schema, form.value);
    if (!isValid) return;

    emit('save', { ...form.value });
};

defineExpose({
    restore() {
        form.value = formRestore();
    },
});
</script>