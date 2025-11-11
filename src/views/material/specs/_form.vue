<template>
    <form @submit.prevent="onSave" autocomplete="off">
        <div class="mb-3">
            <Label>{{ t('label.material_specs.id') }}</Label>
            <Input type="text" v-model="form.id" />
            <Message :error="errors.id" />
        </div>
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
    id: withLabel('label.material_specs.id', yup.string().required()),
});

const formRestore = () => ({
    id: '',
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

    emit('save', form.value);
};

defineExpose({
    restore() {
        form.value = formRestore();
    },
});
</script>