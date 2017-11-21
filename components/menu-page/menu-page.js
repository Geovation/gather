import React from 'react'
import { default as HTML } from 'react-dom-factories'

import * as firebase from '/common/firebase.js'

export default class MenuPage extends React.Component {

    render() {
        return HTML.div({ className: 'Menu-page' }, ...[
            HTML.h1({}, 'Work in progress'),
            HTML.p({}, ...[
                'The following file exists but you need to login to have access to it: ',
                HTML.a({ href: 'https://firebasestorage.googleapis.com/v0/b/gather-f7fb3.appspot.com/o/db.json' }, 'Click me')
            ]),
            HTML.p({},
                firebase.auth().currentUser ? `Hello ${firebase.auth().currentUser.email}` : HTML.a({ href : '/login' }, "login")
            ),
            HTML.p({},
                HTML.a({ href : '/insight' }, "insight")
            )
        ])
    }

}
