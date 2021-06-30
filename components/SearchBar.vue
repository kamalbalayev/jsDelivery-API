<template>
    <v-card elevation="16" rounded="lg" class="mb-3 mb-md-6 pa-3 pa-md-6">
        <v-form @submit.prevent="searchPackages" class="d-flex">

            <v-text-field hide-details outlined
                          :dense="$vuetify.breakpoint.smAndDown"
                          :label="$t('searchPackages')"
                          v-model="search"/>

            <v-btn type="submit" color="blue" dark depressed class="ml-2"
                   :height="$vuetify.breakpoint.mdAndUp ? 56 : 40">

                {{$vuetify.breakpoint.smAndUp ? $t('search') : ''}}

                <v-icon v-text="'mdi-magnify'" :right="$vuetify.breakpoint.smAndUp"/>

            </v-btn>

        </v-form>
    </v-card>
</template>

<script>

import global from '/mixins'

export default {
    name: "SearchBar",
    mixins: [global],
    data() {
        return {
            search: null
        }
    },
    async fetch() {

        const query = this.$route.query

        if(query.search){
            this.search = query.search
            await this.getPackages(query)
        }
    },
    watch:{
        '$route.query': {
            deep: true,
            handler(query){
                this.getPackages(query)
            }
        },
    },
    methods:{
        searchPackages(){
            this.pushQuery('search', this.search)
        }
    }
}
</script>
