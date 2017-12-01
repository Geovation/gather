import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class Chooser extends React.Component {

    constructor() {
        super()
        this.toggle = this.toggle.bind(this)
        this.select = this.select.bind(this)
    }

    toggle() {
        if (this.props.options.length === 0) return
        this.props.select(null)
    }

    select(option) {
        return () => this.props.select(option)
    }

    render() {
        const state = this.props.options.length === 0 ? ' unselectable'
              : this.props.selecting ? ' selecting'
              : this.props.selected ? ' selected'
              : ''
        const header = HTML.div({ className: 'header', onClick: this.toggle }, ...[
            HTML.span({ className: 'title' }, this.props.title + ': '),
            HTML.span({ className: 'chosen' }, this.props.selected ? this.props.selected.name : null),
            HTML.span({ className: 'state' }, this.props.selecting ? 'Select ' + this.props.title.toLowerCase() : null),
        ])
        const options = this.props.options.map(option => {
            return HTML.li({ onClick: this.select(option) }, option.name)
        })
        return HTML.div({ className: 'chooser' + state }, ...[
            header,
            this.props.selecting ? HTML.ol({}, ...options) : null
        ])
    }

}
