import FirebaseUtils from '/common/firebase-utils.js'

export default class Config {
    static config = {
        tilehostingKey: 'whjiogsLFRP3LYUHRMdF',
        data: {
            areas: null,
            sanitation: null
        }
    }

    static get() {
        const promiseGetNewUrls = retrieveFreshUrls()

        let localStorageData = null
        try {
            localStorageData = JSON.parse(localStorage.getItem("cachedData"))
        } catch (e) {
            console.log('localStorage corrupted')
        }

        if (!localStorageData) {
            return promiseGetNewUrls
        } else {
            Config.config.data = localStorageData
        }

        return Promise.resolve(Config.config)

        function retrieveFreshUrls() {
            return new Promise((resolve, reject) => {
                FirebaseUtils.database.ref('.info/connected').on("value", snap => {
                    // when online, refresh URL
                    if (snap.val()) {
                        const dataKeys = Object.keys(Config.config.data)
                        const urlsPromises = dataKeys.map( dataKey => {
                            const gsName = `${dataKey}.geo.json`
                            return FirebaseUtils.storage.ref(gsName).getDownloadURL()
                        })

                        return Promise.all(urlsPromises).then( urls => {

                            Config.config.data = urls.reduce((pV, cV, cI) => {
                                pV[dataKeys[cI]] = cV
                                return pV
                            }, {})

                            localStorage.setItem("cachedData", JSON.stringify(Config.config.data))
                            console.log("Local storage refreshed")

                            resolve(Config.config)
                        })
                    } // end if
                }) // end firebase on
            }) // end promise
        } // end retrieveFreshUrls
    } // end get
}
