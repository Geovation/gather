import FirebaseUtils from '/common/firebase-utils.js'

// GS (Google Storage) path
const dataGS = [ 'areas', 'sanitation' ]
const Config = {
    tilehostingKey: 'whjiogsLFRP3LYUHRMdF',
    data: {}
}

function init() {


    const promiseGetNewUrls = new Promise( (resolve, reject) => {
        FirebaseUtils.database.ref('.info/connected').on("value", snap => {

            // when online, refresh URL
            if (snap.val()) {
                let numOfDataBeingProcessed = 0
                const calculatedData = {}
                dataGS.forEach( dataName => {
                    numOfDataBeingProcessed++
                    const gsName = `${dataName}.geo.json`
                    FirebaseUtils.storage.ref(gsName).getDownloadURL()
                        .then( url => {
                            calculatedData[dataName] = url
                            numOfDataBeingProcessed--
                            if (!numOfDataBeingProcessed) {
                                localStorage.setItem("cachedData", JSON.stringify(calculatedData))
                                Config.data = calculatedData
                                console.log("Local storage refreshed")
                                resolve()
                            }
                        })
                        .catch(reject)
                })
            }
        })
    });

    // use localStorage first
    try {
        Config.data = JSON.parse(localStorage.getItem("cachedData"))
    } catch (e) {
        Config.data = null
    }

    if (!Config.data) {
        return promiseGetNewUrls
    }

    return Promise.resolve()
}

export {
    init,
    Config
}
