<template>
    <v-app-bar fixed app elevation="16" color="purple darken-2 px-md-3">

        <v-toolbar-title v-text="app.name" class="white--text flex-fill font-weight-bold"/>

        <v-tooltip bottom>

            <template #activator="{ on, attrs }">
                <v-btn icon dark v-bind="attrs" v-on="on"
                       :title="darkMode ? 'Light Mode' : 'Night Mode'"
                       @click="setDarkMode">

                    <v-icon v-text="`mdi-${darkMode ? 'white-balance-sunny' : 'weather-night'}`"/>

                </v-btn>
            </template>

            {{ darkMode ? 'Light Mode' : 'Night Mode' }}

        </v-tooltip>

        <language/>

    </v-app-bar>
</template>

<script>
export default {
    name: 'AppHeader',

    components:{
        Language: ()=> import('/components/Language')
    },

    props:{
        darkMode:{
            type: Boolean
        }
    },

    created() {
        this.getDarkMode()
    },

    computed: {
        app() {
            return this.$store.state.app
        },
    },

    methods:{

        getDarkMode() {
            this.$vuetify.theme.dark = !!this.$storage.getCookie('darkMode')
        },

        setDarkMode(){
            this.$storage.setCookie('darkMode', !this.darkMode, {maxAge: 3600 * 24 * 365})
            this.$vuetify.theme.dark = !this.darkMode
        },
    }
}
</script>
