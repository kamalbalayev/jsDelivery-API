<template>
    <v-app dark>

        <app-header :dark-mode="darkMode"/>

        <v-main :class="{'grey lighten-3': !darkMode}">
            <Nuxt/>
        </v-main>

    </v-app>
</template>

<script>
export default {
    components:{
        AppHeader: ()=> import('/components/AppHeader'),
    },
    computed: {
        darkMode(){
            return this.$vuetify.theme.dark
        }
    },
}
</script>

<style lang="scss">
#__nuxt {
    .v-application {
        $pairs: 0;

        @for $i from 1 through 24 {

            $pairs: $pairs + 2px;

            .elevation-#{$i} {
                box-shadow: 0 0 $pairs rgba(0, 0, 0, 0.17) !important;
            }
        }
    }
}
</style>
