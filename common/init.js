import FirebaseUtils from '/common/firebase-utils.js'
import Config from '/common/config.js'
import Routes from '/common/routes.js'

FirebaseUtils.init()
    .then(() => { new Routes() })
