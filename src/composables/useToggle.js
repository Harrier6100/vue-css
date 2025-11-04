import { ref } from 'vue';

export const useToggle = () => {
    const isOpen = ref(false);
    const index = ref(null);

    const open = (i = null) => {
        index.value = i;
        isOpen.value = true;
    };

    const close = () => {
        index.value = null;
        isOpen.value = false;
    };

    const toggle = () => {
        isOpen.value = !isOpen.value;
    };

    return {
        isOpen,
        index,
        open,
        close,
        toggle,
    };
};