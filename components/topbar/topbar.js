import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'

export default class Topbar extends React.Component {

    render() {
        return HTML.div({ className: 'topbar' }, ...[
            HTML.a({ className: 'logo', href: '/' }, HTML.img({ src: '/logo.svg' })),
            HTML.h1({}, 'Gather prototype')
        ])
    }

}
