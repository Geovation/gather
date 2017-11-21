import * as routes from '/common/routes.js'
import * as firebase from '/common/firebase.js'

firebase.init()
    .then(routes.init)
