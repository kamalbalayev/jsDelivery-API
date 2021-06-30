export const state = () => ({
    app: {
        name: 'jsDelivery API'
    },
    loading: false,
    packages: null,
})

export const mutations = {
    SET_LOADING(state, status) {
        state.loading = status
    },
    SET_PACKAGES(state, data) {
        state.packages = data
    },
}

export const actions = {

    async GET_PACKAGES({commit}, params) {

        commit('SET_PACKAGES', null)
        commit('SET_LOADING', true)

        let api = `-/v1/search?text=${params.search}`

        if (params.quality) {
            api += `&quality=${params.quality}`
        }
        if (params.popularity) {
            api += `&popularity=${params.popularity}`
        }
        if (params.maintenance) {
            api += `&maintenance=${params.maintenance}`
        }
        if (params.size) {
            api += `&size=${params.size}`
        }
        if (params.from) {
            api += `&from=${params.from}`
        }

        await this.$axios.get(api).then((res) => {
            commit('SET_PACKAGES', res.data)
            commit('SET_LOADING', false)
        })
    },

}
