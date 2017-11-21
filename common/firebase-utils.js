import Firebase from 'firebase'

export default class FirebaseUtils {
    static auth = null
    static storage = null
    static database = null

    // public ready

    static init() {
        Firebase.firebase.initializeApp({
            apiKey: 'AIzaSyBSJzvEjE66uQpjKw7hRDJWxHoyJ_lID_M',
            authDomain: 'gather-f7fb3.firebaseapp.com',
            projectId: 'gather-f7fb3',
            storageBucket: 'gather-f7fb3.appspot.com',
            databaseURL: "https://gather-f7fb3.firebaseio.com"
        })

        FirebaseUtils.auth = Firebase.firebase.auth
        FirebaseUtils.storage = Firebase.firebase.storage()
        FirebaseUtils.database = Firebase.firebase.database()

        // wait until when we know if the user is logged in
        return new Promise( resolve => {
            const unsubscribe = FirebaseUtils.auth().onAuthStateChanged( user => {
                console.log("User : ", user)
                unsubscribe()
                resolve()
            })
        })
    }
}

