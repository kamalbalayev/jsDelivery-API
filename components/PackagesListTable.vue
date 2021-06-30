<template>
    <v-card elevation="16" rounded="lg" :loading="$store.state.loading">

        <template v-if="packages && packages.objects.length > 0">

            <h1 class="text-h6 text-md-h5 font-weight-bold pa-3 py-md-4 px-md-6">
                <template v-if="$store.state.loading">
                    {{$t('loading')}}
                </template>
                <template v-else>
                    {{$tc('_resultsFoundFor_', packages.total, {n: packages.total, str: $route.query.search})}}
                </template>
            </h1>

            <v-divider/>

            <filter-bar/>

            <v-divider/>

            <v-data-table
                :headers="table.headers"
                :items="table.data"
                :options.sync="table.options"
                :footer-props="table.footerProps"
                :items-per-page="table.options.itemsPerPage"
                :server-items-length="table.options.serverItemsLength"
                mobile-breakpoint="0"
                fixed-header>

                <template #item.action="{ item }">
                    <v-tooltip top>
                        <template #activator="{ on }">
                            <v-btn icon color="info" v-on="on" @click="$emit('package', item)">
                                <v-icon small v-text="'mdi-information-outline'"/>
                            </v-btn>
                        </template>
                        {{$t('details')}}
                    </v-tooltip>
                </template>

            </v-data-table>

        </template>

        <template v-else>

            <skeleton-loader v-if="$store.state.loading"/>

            <h1 v-else class="pa-8 pa-md-16 text-center">

                <v-icon v-text="'mdi-magnify'" size="80"/>

                <span class="d-block grey--text">
                    {{$t('findPackages')}}
                </span>

            </h1>

        </template>

    </v-card>
</template>

<script>

import global from '/mixins'

export default {
    name: "PackagesListTable",
    mixins: [global],
    components: {
        SkeletonLoader: () => import('~/components/SkeletonLoader'),
        FilterBar: () => import('~/components/FilterBar'),
    },
    data() {
        return {
            table: {
                headers: [
                    {text: this.$t('name'), value: 'package.name', sortable: false},
                    {text: this.$t('version'), value: 'package.version', sortable: false},
                    {text: this.$t('author'), value: 'package.author.name', sortable: false},
                    {text: null, value: 'action', sortable: false, width: 20},
                ],
                data: this.packages?.objects,
                options: {
                    itemsPerPage: 10,
                    page: 1,
                    serverItemsLength: null,
                    height: null
                },
                headerProps: {
                    sortable: false
                },
                footerProps: {
                    itemsPerPageOptions: [
                        10,
                        20,
                        50,
                        100,
                    ],
                    itemsPerPageText: '',
                },
            }
        }
    },

    computed: {
        packages() {
            return this.$store.state.packages
        },
        tablePage() {
            return this.table.options.page
        },
        tablePerPage() {
            return this.table.options.itemsPerPage
        },
        getFrom() {
            return (this.tablePage - 1) * this.tablePerPage
        }
    },

    async fetch() {
        this.setTable()
    },

    watch: {

        packages: {
            deep: true,
            handler() {
                this.setTable()
            }
        },

        'table.options.itemsPerPage'(size) {
            if (this.packages) {
                this.getPackages({...this.$route.query, size, from: this.getFrom})
            }
        },

        'table.options.page'() {
            if (this.packages) {
                this.getPackages({...this.$route.query, size: this.tablePerPage, from: this.getFrom})
            }
        },

    },

    methods: {
        setTable() {
            this.table.data = this.packages?.objects
            this.table.options.serverItemsLength = this.packages?.total
        }
    }
}
</script>
