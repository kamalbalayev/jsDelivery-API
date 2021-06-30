const i18n = {
    defaultLocale: 'en',
    locale: 'en',
    locales: [
        {code: 'en', iso: 'en', file: 'en_US.js', name: 'English'},
        {code: 'ru', iso: 'ru', file: 'ru_RU.js', name: 'Русский'},
    ],
    lazy: true,
    langDir: 'lang/',
    vuex: {
        syncLocale: true,
    },
    seo: true,
    detectBrowserLanguage: false,
    intervalPlural: true,
    parsePages: false,
    pages: []
};

export default i18n
