import Firebase from 'firebase'

let auth = null
let storage = null
let database = null

function init() {
    Firebase.firebase.initializeApp({
        apiKey: 'AIzaSyBSJzvEjE66uQpjKw7hRDJWxHoyJ_lID_M',
        authDomain: 'gather-f7fb3.firebaseapp.com',
        projectId: 'gather-f7fb3',
        storageBucket: 'gather-f7fb3.appspot.com',
        databaseURL: "https://gather-f7fb3.firebaseio.com"
    })

    const app = Firebase.firebase.app()
    auth = Firebase.firebase.auth
    storage = Firebase.firebase.storage()
    database = Firebase.firebase.database()
    const features = ['auth', 'storage'].filter(feature => typeof app[feature] === 'function')
    console.log(`Firebase SDK loaded with ${features.join(', ')}`)

    // wait until when we know if the user is logged in
    return new Promise( resolve => {
        const unsubscribe = auth().onAuthStateChanged( user => {
            console.log("User : ", user)
            unsubscribe()
            resolve()
        })
    })
}

export {
    init,
    auth,
    storage,
    database
}
