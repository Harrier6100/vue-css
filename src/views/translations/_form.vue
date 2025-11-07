<template>
    <form @submit.prevent="onSave" autocomplete="off">
        <div class="mb-3">
            <label class="text-gray-700" for="id">{{ t('label.translations.id') }}</label>
            <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" id="id" v-model="form.id">
            <Message :error="errors.id" />
        </div>
        <div class="mb-3">
            <label class="text-gray-700">{{ t('label.translations.translations') }}</label>
            <div class="mb-3">
                <label><i class="fi fi-jp w-4 h-4"></i></label>
                <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" v-model="form.translations.ja">
            </div>
            <div class="mb-3">
                <label><i class="fi fi-us w-4 h-4"></i></label>
                <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" v-model="form.translations.en">
            </div>
            <div class="mb-3">
                <label><i class="fi fi-kr w-4 h-4"></i></label>
                <input class="px-1 border border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300" type="text" v-model="form.translations.ko">
            </div>
        </div>
        <button class="px-4 py-1 rounded-md cursor-pointer text-white bg-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 active:hover:bg-blue-600 disabled:opacity-50 disabled:pointer-events-none" type="submit" :disabled="isLoading">
            <span v-if="props.isSpinning"></span>{{ t('button.save') }}
        </button>
        <button class="px-4 py-1 rounded-md cursor-pointer focus:outline-none" type="button" @click="emit('cancel')">{{ t('button.back') }}</button>
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