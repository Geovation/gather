import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return HTML.div({ className: 'insight-page' }, ...[
            React.createElement(Map, {})
        ])
    }

}
