<template>
    <div class="pa-3 pa-md-6">
        <v-row :dense="$vuetify.breakpoint.smAndDown">
            <v-col cols="4" sm="4" md="3">
                <v-select hide-details outlined dense
                          :label="$t('quality')"
                          v-model="filter.quality"
                          :items="filterOptions"
                          item-text="title" item-value="value"
                          @change="pushQuery('quality', filter.quality)"/>
            </v-col>
            <v-col cols="4" sm="4" md="3">
                <v-select hide-details outlined dense
                          :label="$t('popularity')"
                          v-model="filter.popularity"
                          :items="filterOptions"
                          item-text="title" item-value="value"
                          @change="pushQuery('popularity', filter.popularity)"/>
            </v-col>
            <v-col cols="4" sm="4" md="3">
                <v-select hide-details outlined dense
                          :label="$t('maintenance')"
                          v-model="filter.maintenance"
                          :items="filterOptions"
                          item-text="title" item-value="value"
                          @change="pushQuery('maintenance', filter.maintenance)"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>

import global from '/mixins'

export default {
    name: "FilterBar",
    mixins: [global],

    data(){
        return{
            filter:{
                quality: null,
                popularity: null,
                maintenance: null,
            }
        }
    },

    async fetch() {
        this.filter.quality = this.$route.query.quality || null
        this.filter.popularity = this.$route.query.popularity || null
        this.filter.maintenance = this.$route.query.maintenance || null
    },
    computed:{
        filterOptions(){
            return [
                {
                    title: this.$t('high'),
                    value: '1.0',
                },
                {
                    title: this.$t('low'),
                    value: '0.0',
                },
            ]
        },
    },
}
</script>
