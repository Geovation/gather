import React from 'react'
import { default as HTML } from 'react-dom-factories'
import md5 from 'md5'
import fetchJsonp from 'fetch-jsonp'

import FirebaseUtils from '/common/firebase-utils.js'

export default class Topbar extends React.Component {

    constructor() {
        super()
        this.state = {
            thumbnailUrl: 'https://www.gravatar.com/avatar/00000000000000000000000000000000',
            name: {
                formatted: 'No user name from gravatar'
            }
        }

        const hash = md5(FirebaseUtils.auth().currentUser.email.toLowerCase())
        fetchJsonp(`https://www.gravatar.com/${hash}.json`)
            .then(response => response.json())
            .then(a => this.setState(a.entry[0]))
    }

    render() {
        return HTML.div({ className: 'topbar' }, ...[
            HTML.a({ className: 'logo', href: '/' }, HTML.img({ src: '/logo.svg' })),
            HTML.h1({}, 'Gather prototype'),
            this.state.thumbnailUrl ? HTML.img({ className: 'right gravatar', src: this.state.thumbnailUrl } ) : null,
            HTML.h1({ className: 'right' }, `<${FirebaseUtils.auth().currentUser.email}>`),
            this.state.name && this.state.name.formatted ? HTML.h1({ className: 'right' }, `${this.state.name.formatted}`): null
        ])
    }

}
