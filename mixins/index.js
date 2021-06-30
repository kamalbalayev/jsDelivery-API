const global = {
    methods: {

        pushQuery(query, val) {

            const routeQuery = Object.assign({}, this.$route.query);

            if (val) {

                this.$router.push({query: Object.assign({}, routeQuery, {[query]: val})})

            } else {

                delete routeQuery[query];

                this.$router.replace({query: routeQuery}).catch(e => {
                    console.log('My Sweet Error: ' + e)
                });

            }
        },

        async getPackages({search = '', quality = '', popularity = '', maintenance = '', size = 10, from = 0}) {

            const params = {search, quality, popularity, maintenance, size, from}

            await this.$store.dispatch('GET_PACKAGES', params)

        }

    }
}

export default global
