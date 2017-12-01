import FirebaseUtils from '/common/firebase-utils.js'
import config from '/config.json'

export default class Config {

    static isLoaded = false

    static get() {
        const cached = localStorage.getItem('cachedData')
        if (cached) return JSON.parse(cached)
        else throw new Error('Trying to get config before it has been loaded!')
    }

    static load() {
        const dataFromFirebase = config.slums.map(slum => {
            const resolved = Object.keys(slum.files).map(key => {
                const file = slum.files[key]
                return FirebaseUtils.resolveFile(file).then(url => {
                    return { [key]: url }
                })
            })
            return Promise.all(resolved).then(results => {
                const files = Object.assign(...results)
                return Object.assign(slum, { files })
            })
        })
        return Promise.all(dataFromFirebase)
            .then(data => {
                const configResolved = Object.assign({ data }, config)
                localStorage.setItem('cachedData', JSON.stringify(configResolved))
                Config.isLoaded = true
                return configResolved
            })
            .catch(console.error)
    }
}
