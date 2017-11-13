import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Firebase from 'firebase'

export default class MenuPage extends React.Component {

    constructor() {
        super()
        Firebase.firebase.initializeApp({
            apiKey: 'AIzaSyBSJzvEjE66uQpjKw7hRDJWxHoyJ_lID_M',
            authDomain: 'gather-f7fb3.firebaseapp.com',
            projectId: 'gather-f7fb3',
            storageBucket: 'gather-f7fb3.appspot.com'
        })
        try {
            const app = Firebase.firebase.app()
            const features = ['auth', 'storage'].filter(feature => typeof app[feature] === 'function')
            console.log(`Firebase SDK loaded with ${features.join(', ')}`)
        }
        catch (e) {
            console.error('Could not load Firebase', e)
        }
    }

    render() {
        return HTML.div({ className: 'Menu-page' }, ...[
            HTML.h1({}, 'Work in progress'),
            HTML.p({}, ...[
                'The following file exists but you need to login to have access to it: ',
                HTML.a({ href: 'https://firebasestorage.googleapis.com/v0/b/gather-f7fb3.appspot.com/o/db.json' }, 'Click me')
            ])
        ])
    }

}
