<template>
    <v-container class="py-md-6">

        <searchbar/>

        <packages-list @package="openPackageDetails($event)"/>

        <package-detail :open="packageDetailsDialog" :selected="selectedPackage"/>

    </v-container>
</template>

<script>
export default {
    components:{
        Searchbar: ()=> import('/components/SearchBar'),
        PackagesList: ()=> import('/components/PackagesListTable'),
        PackageDetail: ()=> import('/components/PackageDetailsDialog'),
    },
    data(){
        return {
            selectedPackage: null,
            packageDetailsDialog: false,
        }
    },
    methods:{
        openPackageDetails(selectedPackage){
            this.packageDetailsDialog = !this.packageDetailsDialog
            this.selectedPackage = selectedPackage
        }
    }
}
</script>
