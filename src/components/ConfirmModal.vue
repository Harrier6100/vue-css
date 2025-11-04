<template>
    <teleport to="body">
        <div v-if="isOpen">
            {{ confirmMessage }}
            <button @click="confirmNo">{{ t('button.no') }}</button>
            <button @click="confirmYes">{{ t('button.yes') }}</button>
        </div>
    </teleport>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useConfirm } from '@/composables/useConfirm';

const { t } = useI18n();
const { isOpen, confirmMessage, confirmYes, confirmNo } = useConfirm();
</script>