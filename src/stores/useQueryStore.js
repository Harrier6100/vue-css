import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useQueryStore = defineStore('query', () => {
    const query = ref({});

    const getQuery = () => {
        return query.value;
    };

    const setQuery = (value) => {
        query.value = value;
    };

    return {
        getQuery,
        setQuery,
    };
});