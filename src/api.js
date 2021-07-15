var axios = require('axios');

const url = 'https://api.coincap.io/v2'

export default {
    getAssets: () => {
        return axios({
            method: 'get',
            url: `${url}/assets?limit=20`,
            headers: {}
        })
    },

    getAsset: (coin) => {
        return axios({
            method: 'get',
            url: `${url}/assets/${coin}`,
            headers: {}
        })
    },

    getAssetHistory: (coin) => {
        const now = new Date()
        const end = now.getTime()
        now.setDate(now.getDate() - 1)
        const start = now.getTime()

        return axios({
            method: 'get',
            url: `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`,
            headers: {}
        })
    },

    getMarkets: (coin) => {
        return axios({
            method: 'get',
            url: `${url}/assets/${coin}/markets?limit=5`,
            headers: {}
        })
    },

    getExchange: (id) => {
        return axios({
            method: 'get',
            url: `${url}/exchanges/${id}`,
            headers: {}
        })
    },

}