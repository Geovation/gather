import FirebaseUtils from '/common/firebase-utils.js'
import config from '/config.json'

export default class Config {

    static isLoaded = false

    static get() {
        const cached = localStorage.getItem('config')
        if (cached) return JSON.parse(cached)
        else throw new Error('Trying to get config before it has been loaded!')
    }

    static load() {
        const resolveSection = section => {
            if (!Array.isArray(section)) return Promise.resolve(section)
            const items = section.map(item => {
                if (!item.files) return Promise.resolve(item)
                return FirebaseUtils.resolveFiles(item.files).then(files => {
                    return Object.assign(item, { files })
                })
            })
            return Promise.all(items)
        }
        const resolve = () => {
            const sectionList = Object.keys(config).map(key => {
                return resolveSection(config[key]).then(result => {
                    return { [key]: result }
                })
            })
            return Promise.all(sectionList).then(sections => {
                return Object.assign(...sections)
            })
        }
        return resolve()
            .then(configResolved => {
                localStorage.setItem('config', JSON.stringify(configResolved))
                Config.isLoaded = true
                return configResolved
            })
            .catch(console.error)
    }
}
