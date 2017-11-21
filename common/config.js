import * as Firebase from '/common/firebase.js'

export default class Config {

    static get() {
        const defaults = {
            tilehostingKey: 'whjiogsLFRP3LYUHRMdF',
            dataFiles: {
                areas: 'areas.geo.json',
                sanitation: 'sanitation.geo.json'
            }
        }
        return new Promise((resolve, reject) => {
            Firebase.database.ref('.info/connected').on('value', snap => {
                if (!snap.val()) return
                const requests = Object.keys(defaults.dataFiles).map(key => {
                    return Firebase.storage.ref(defaults.dataFiles[key]).getDownloadURL().then(url => {
                        return { [key]: url }
                    })
                })
                Promise.all(requests)
                    .then(results => {
                        const data = Object.assign(...results)
                        const output = Object.assign({ data }, defaults)
                        this.get = () => Promise.resolve(output)
                        resolve(output)
                    })
                    .catch(reject)
            })
        })
    }

}
