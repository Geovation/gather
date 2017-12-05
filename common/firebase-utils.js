import Firebase from 'firebase'

export default class FirebaseUtils {

    static auth = null
    static storage = null
    static database = null

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
        return new Promise(resolve => {
            const unsubscribe = FirebaseUtils.auth().onAuthStateChanged(user => {
                unsubscribe()
                resolve()
            })
        })
    }

    static resolveFile(filename) {
        return new Promise((resolve, reject) => {
            FirebaseUtils.database.ref('.info/connected').on('value', snap => {
                return FirebaseUtils.storage.ref(filename).getDownloadURL().then(resolve).catch(reject)
            })
        })
    }

    static resolveFiles(files) {
        const list = Object.keys(files).map(key => {
            return FirebaseUtils.resolveFile(files[key]).then(url => {
                return { [key]: url }
            })
        })
        return Promise.all(list).then(file => {
            return Object.assign(...file)
        })
    }

}
