import { ref } from 'vue';

export const useValidate = () => {
    const errors = ref({});

    const withLabel = (label, schema) => {
        return schema.label(label);
    };

    const validate = async (schema, formData) => {
        try {
            await schema.validate(formData, { abortEarly: false });
            errors.value = {};
            return true;
        } catch (err) {
            const newErrors = {};
            if (err.inner && Array.isArray(err.inner)) {
                err.inner.forEach(e => {
                    const path = e.path || 'error';
                    newErrors[path] = e.message;
                });
            }
            errors.value = newErrors;
            return false;
        }
    };

    return {
        errors,
        validate,
        withLabel,
    };
};