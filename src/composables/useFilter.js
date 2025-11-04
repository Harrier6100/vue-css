import { ref, computed } from 'vue';
import moment from 'moment';

export const useFilter = (filterData) => {
    const keyword = ref('');

    const getAllValues = (obj) => {
        if (obj === null || obj === undefined) return [];
        if (typeof obj === 'string') {
            if (/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(obj)) {
                return [moment.utc(obj).local().format('YYYY-MM-DD HH:mm:ss')];
            }
            return [obj];
        }
        if (typeof obj !== 'object') return [String(obj)];

        return Object.values(obj).flatMap(value => getAllValues(value));
    };

    const filteredData = computed(() => {
        const kw = keyword.value.toLowerCase();
        if (!kw) return filterData.value;

        return filterData.value.filter(item => {
            const allValues = getAllValues(item);
            return allValues.some(value => value.toLowerCase().includes(kw));
        });
    });

    return {
        keyword,
        filteredData,
    };
};