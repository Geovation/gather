import * as Routes from '/common/routes.js'
import * as Firebase from '/common/firebase.js'

Firebase.init()
    .then(Routes.init)
