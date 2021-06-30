<template>
    <v-dialog v-model="dialog" width="960"
              :fullscreen="$vuetify.breakpoint.smAndDown"
              :transition="$vuetify.breakpoint.smAndDown ? 'dialog-bottom-transition' : 'dialog-transition'">

        <v-card tile v-if="package" rounded="lg">

            <div class="pa-3 pa-md-6">

                <v-row>

                    <v-col cols="12" md="8">

                        <v-card-title class="text-h6 mb-3 mb-md-6 py-2 px-3 elevation-16 rounded-lg">
                            {{$t('packageDetails')}}
                        </v-card-title>

                        <table class="fill-width">
                            <tbody>
                            <tr v-if="package.name">
                                <th class="text-left py-2" :width="$vuetify.breakpoint.mdAndUp ? 200 : 100">
                                    {{$t('name')}}:
                                </th>
                                <td class="text-left py-2">
                                    {{ package.name }}
                                </td>
                            </tr>
                            <tr v-if="package.version">
                                <th class="text-left py-2">
                                    {{$t('version')}}:
                                </th>
                                <td class="text-left py-2">
                                    {{ package.version }}
                                </td>
                            </tr>
                            <tr v-if="package.description">
                                <th class="text-left py-2">
                                    {{$t('description')}}:
                                </th>
                                <td class="text-left py-2">
                                    {{ package.description }}
                                </td>
                            </tr>
                            <tr v-if="package.author">
                                <th class="text-left py-2">
                                    {{$t('author')}}:
                                </th>
                                <td class="text-left py-2">
                                    {{ package.author.name }}
                                </td>
                            </tr>
                            <tr v-if="package.publisher">
                                <th class="text-left py-2">
                                    {{$t('publisher')}}:
                                </th>
                                <td class="text-left py-2">
                                    <v-btn outlined text color="blue" rounded small class="mt-1 mr-1"
                                           target="_blank" rel="noopener noreferrer"
                                           :href="`mailto:${package.publisher.email}`">
                                        {{ package.publisher.username }}
                                        <v-icon v-text="'mdi-email-outline'" small right/>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr v-if="package.maintainers && package.maintainers.length > 0">
                                <th class="text-left py-2">
                                    {{$t('maintainers')}}:
                                </th>
                                <td class="text-left py-2">
                                    <v-btn outlined text color="blue" rounded small class="mt-1 mr-1"
                                           v-for="(maintainer, i) in package.maintainers" :key="i"
                                           :href="`mailto:${maintainer.email}`" target="_blank"
                                           rel="noopener noreferrer">
                                        {{ maintainer.username }}
                                        <v-icon v-text="'mdi-email-outline'" small right/>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr>
                                <th class="text-left py-2">
                                    {{$t('links')}}:
                                </th>
                                <td class="text-left py-2">
                                    <v-btn outlined text color="blue" rounded small class="mt-1 mr-1"
                                           v-for="(val, key, i) in package.links" :key="i"
                                           :href="val" target="_blank" rel="noopener noreferrer">
                                        {{ key }}
                                        <v-icon v-text="'mdi-link'" right/>
                                    </v-btn>
                                </td>
                            </tr>
                            <tr v-if="package.keywords && package.keywords.length > 0">
                                <th class="text-left py-2">
                                    {{$t('keywords')}}:
                                </th>
                                <td class="text-left py-2">
                                    <v-chip color="green" dark small class="mt-1 mr-1"
                                            v-for="keyword in package.keywords"
                                            :key="keyword">
                                        {{ keyword }}
                                    </v-chip>
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </v-col>

                    <v-col cols="12" md="4">

                        <v-btn large text block elevation="16" color="green" height="48" max-width="100%"
                               class="text-lowercase d-flex justify-start align-center rounded-lg mb-4 mb-md-7 overflow-hidden"
                               @click="compToClipboard">

                            <div class="d-flex justify-space-between flex-fill">

                                <span class="text-left text-truncate text-wrap d-block">
                                    <v-icon v-text="'mdi-chevron-right'" left/>

                                    npm i {{ package.name }}
                                </span>

                                <v-icon v-text="`mdi-${copied ? 'check-all' : 'content-copy'}`" right/>

                            </div>

                            <input type="text" :value="`npm i ${package.name}`" id="npm-command"
                                   style="width: 1px; height: 0; opacity: 0">

                        </v-btn>

                        <v-card outlined rounded="lg" class="py-4 px-3">

                            <h2 class="text-body-1 mb-3 font-weight-bold text-center">
                                {{$t('score')}}
                            </h2>

                            <v-divider class="mb-4"/>

                            <v-row>
                                <v-col cols="6" sm="3" md="6" class="text-center">

                                    <v-progress-circular
                                        :rotate="360"
                                        :size="50"
                                        :width="5"
                                        :value="score.detail.quality * 100"
                                        color="teal">
                                        <small>{{ (score.detail.quality * 100).toFixed(1) }}</small>
                                    </v-progress-circular>

                                    <small class="d-block d-block mt-1">
                                        {{$t('quality')}}
                                    </small>

                                </v-col>
                                <v-col cols="6" sm="3" md="6" class="text-center">

                                    <v-progress-circular
                                        :rotate="360"
                                        :size="50"
                                        :width="5"
                                        :value="score.detail.popularity * 100"
                                        color="teal">
                                        <small>{{ (score.detail.popularity * 100).toFixed(1) }}</small>
                                    </v-progress-circular>

                                    <small class="d-block d-block mt-1">
                                        {{$t('popularity')}}
                                    </small>

                                </v-col>
                                <v-col cols="6" sm="3" md="6" class="text-center">

                                    <v-progress-circular
                                        :rotate="360"
                                        :size="50"
                                        :width="5"
                                        :value="score.detail.maintenance * 100"
                                        color="teal">
                                        <small>{{ (score.detail.maintenance * 100).toFixed(1) }}</small>
                                    </v-progress-circular>

                                    <small class="d-block d-block mt-1">
                                        {{$t('maintenance')}}
                                    </small>

                                </v-col>
                                <v-col cols="6" sm="3" md="6" class="text-center">

                                    <v-progress-circular
                                        :rotate="360"
                                        :size="50"
                                        :width="5"
                                        :value="score.final * 100"
                                        color="teal">
                                        <small>{{ (score.final * 100).toFixed(1) }}</small>
                                    </v-progress-circular>

                                    <small class="d-block d-block mt-1">
                                        {{$t('final')}}
                                    </small>

                                </v-col>
                            </v-row>
                        </v-card>

                    </v-col>

                </v-row>

            </div>

            <v-divider/>

            <v-card-actions>

                <v-spacer/>

                <v-btn color="primary" text @click="dialog = false">
                    {{$t('close')}}
                </v-btn>

            </v-card-actions>

        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "PackageDetailsDialog",
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        selected: {
            type: Object,
        },
    },

    data() {
        return {
            dialog: false,
            copied: false,
        }
    },

    computed: {

        package() {
            return this.selected?.package
        },

        score() {
            return this.selected?.score
        },

    },

    watch: {
        open() {
            this.dialog = true
        },
    },

    methods:{
        compToClipboard() {
            const copyText = document.getElementById("npm-command");
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
            this.copied = true
            const vm = this;
            setTimeout(() => {
                vm.copied = false
            }, 1500)
        },
    }
}
</script>
