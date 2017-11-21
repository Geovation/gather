import Routes from '/common/routes.js'
import FirebaseUtils from '/common/firebase-utils.js'

FirebaseUtils.init()
    .then(() => { new Routes()})
