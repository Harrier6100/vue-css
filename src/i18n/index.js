import { createI18n } from 'vue-i18n';
const modules = import.meta.glob('./modules/*.json', { eager: true });

const messages = Object.fromEntries(
    Object.entries(modules).map(([path, value]) => {
        const locale = path.split('/').pop().replace('.json', '');
        return [locale, value.default];
    })
);

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') ?? 'ja',
    messages,
    missing: (locale, key) => {
        return key;
    },
    fallbackWarn: false,
});

export default i18n;