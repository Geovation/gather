import FirebaseUtils from '/common/firebase-utils.js'
import config from '/config.json'

export default class Config {

    static get() {
        const cached = localStorage.getItem('cachedData')
        if (cached) return JSON.parse(cached)
        else throw Exception('Trying to get config before it has been loaded!')
    }

    static load() {
        const dataFromFirebase = config.data.map(country => {
            const resolved = Object.keys(country.files).map(key => {
                const file = country.files[key]
                return FirebaseUtils.resolveFile(file).then(url => {
                    return { [key]: url }
                })
            })
            return Promise.all(resolved).then(results => {
                const files = Object.assign(...results)
                return Object.assign(country, { files })
            })
        })
        return Promise.all(dataFromFirebase)
            .then(data => {
                const configResolved = Object.assign({ data }, config)
                localStorage.setItem('cachedData', JSON.stringify(configResolved))
                return configResolved
            })
            .catch(console.error)
    }

}
