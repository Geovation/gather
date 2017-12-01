import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Chooser from '/components/chooser/chooser.js'
import Config from '/common/config.js'

export default class SelectorPage extends React.Component {

    constructor() {
        super()
        this.go = this.go.bind(this)
    }

    go() {
        Page('/insight')
    }

    componentWillMount() {
        this.props.countrySelect(null)
    }

    render() {
        const map = React.createElement(Map, {
            centre: [14, 0],
            zoom: 3,
            data: [],
            isFixed: true
        })
        const countries = Config.get().countries
        const cities = !this.props.countrySelected ? [] : Config.get().cities.filter(city => {
            return city.country === this.props.countrySelected.id
        })
        const slums = !this.props.citySelected ? [] : Config.get().slums.filter(slum => {
            return slum.city === this.props.citySelected.id
        })
        const dialog = HTML.div({ className: 'dialog' }, ...[
            HTML.h2({}, 'Select location:'),
            React.createElement(Chooser, {
                title: 'Country',
                options: countries,
                selecting: this.props.countrySelected === null,
                selected: this.props.countrySelected,
                select: this.props.countrySelect
            }),
            React.createElement(Chooser, {
                title: 'City',
                options: cities,
                selecting: this.props.countrySelected && this.props.citySelected === null,
                selected: this.props.citySelected,
                select: this.props.citySelect
            }),
            React.createElement(Chooser, {
                title: 'Slum',
                options: slums,
                selecting: this.props.countrySelected && this.props.citySelected && this.props.slumSelected === null,
                selected: this.props.slumSelected,
                select: this.props.slumSelect
            }),
            HTML.button({ onClick: this.go, disabled: this.props.slumSelected === null }, 'Go')
        ])
        return HTML.div({ className: 'page selector-page' }, ...[
            map,
            dialog
        ])
    }

}
