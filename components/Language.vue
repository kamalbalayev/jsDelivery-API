<template>
    <v-menu left tile offset-y bottom :nudge-bottom="15"
            transition="slide-y-reverse-transition">

        <template #activator="{ on: menu }">
            <v-tooltip bottom>
                <template #activator="{ on: tooltip, attrs }">

                    <v-btn icon dark v-on="{ ...tooltip, ...menu }">
                        {{$i18n.locale}}
                    </v-btn>

                </template>
                {{ localeName($i18n.locale) }}
            </v-tooltip>
        </template>

        <v-card rounded="lg" :width="$vuetify.breakpoint.smAndDown ? 245 : 170">
            <v-list dense>
                <v-list-item v-for="locale in $i18n.locales" :key="locale.code"
                             @click="setLang(locale.code)" exact
                             :to="switchLocalePath(locale.code)" class="d-flex align-center">

                    <v-list-item-content>
                        <v-list-item-title v-text="locale.name"/>
                    </v-list-item-content>

                </v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script>
export default {
    name: "language",
    async fetch() {
        const lang = this.$storage.getCookie('lang')

        if (lang) {
            this.setLang(lang)
        } else {
            this.setLang(this.$store.state.locale)
        }
    },
    methods: {
        setLang(code) {
            this.$i18n.locale = code;
            this.$axios.setHeader('Content-Language', code);
            this.$axios.setHeader('Accept-Language', code);
            this.$storage.setCookie('lang', code, {maxAge: 3600 * 24 * 365});
        },

        localeName(code) {
            const locale = this.$i18n.locales.find(lang => lang.code === code)
            return locale?.name || 'en'
        },
    }
}
</script>
