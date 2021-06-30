<template>
<div>
    <div class="pa-3 px-md-6 py-md-5">
        <v-skeleton-loader type="heading"/>
    </div>

    <v-divider/>

    <div class="pa-3 pa-md-6">
        <v-row>

            <v-col cols="4" sm="4" md="3">
                <v-skeleton-loader type="image" height="40"/>
            </v-col>

            <v-col cols="4" sm="4" md="3">
                <v-skeleton-loader type="image" height="40"/>
            </v-col>

            <v-col cols="4" sm="4" md="3">
                <v-skeleton-loader type="image" height="40"/>
            </v-col>

        </v-row>
    </div>

    <v-divider/>

    <v-skeleton-loader type="table"/>

</div>
</template>

<script>
export default {
    name: "SkeletonLoader"
}
</script>
