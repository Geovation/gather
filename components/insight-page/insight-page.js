import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class InsightPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        return HTML.div({ className: 'insight-page' }, 'Testing...')
    }

}
