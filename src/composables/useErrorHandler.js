import i18n from '@/i18n';
import { useToast } from '@/composables/useToast';

export const errorHandler = (error) => {
    const t = i18n.global.t;
    const { addToast } = useToast();
    console.error(error);

    if (!error.response) {
        addToast(t('toast.error'), 'error');
        return;
    }

    const status = error.response.data.status;
    const message = error.response.data.message;

    switch (status) {
        case 404:
            addToast(t('toast.404'), 'error');
            break;
        default:
            addToast(message, 'error');
    }
};