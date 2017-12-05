import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Chooser from '/components/chooser/chooser.js'
import Config from '/common/config.js'

export default class SelectorPage extends React.Component {

    constructor() {
        super()
        this.state = {
            highlighted: null
        }
        this.countrySelect = this.countrySelect.bind(this)
        this.citySelect = this.citySelect.bind(this)
        this.slumSelect = this.slumSelect.bind(this)
        this.go = this.go.bind(this)
    }

    countrySelect(country) {
        this.setState({ highlighted: country })
        this.props.countrySelect(country)
    }

    citySelect(city) {
        if (city === null) this.setState({ highlighted: this.props.countrySelected })
        else this.setState({ highlighted: city })
        this.props.citySelect(city)
    }

    slumSelect(slum) {
        if (slum === null) this.setState({ highlighted: this.props.citySelected })
        else this.setState({ highlighted: slum })
        this.props.slumSelect(slum)
    }

    go() {
        Page('/insight')
    }

    componentWillMount() {
        this.props.countrySelect(null)
    }

    render() {
        const data = this.state.highlighted === null ? [] : [
            {
                id: this.state.highlighted.name + 'Outline',
                type: 'fill',
                source: { type: 'geojson', location: this.state.highlighted.files.outline },
                paint: {
                    'fill-color': '#bc7991',
                    'fill-opacity': 0.1
                }
            },
            {
                id: this.state.highlighted.name + 'OutlineBorder',
                type: 'line',
                source: { type: 'geojson', location: this.state.highlighted.files.outline },
                paint: {
                    'line-color': '#bc7991',
                    'line-width': 2
                }
            }
        ]
        const map = React.createElement(Map, {
            centre: [14, 0],
            zoom: 3,
            data,
            padding: {
                top: 85,
                bottom: 25,
                left: 440,
                right: 25
            },
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
                select: this.countrySelect
            }),
            React.createElement(Chooser, {
                title: 'City',
                options: cities,
                selecting: this.props.countrySelected && this.props.citySelected === null,
                selected: this.props.citySelected,
                select: this.citySelect
            }),
            React.createElement(Chooser, {
                title: 'Slum',
                options: slums,
                selecting: this.props.countrySelected && this.props.citySelected && this.props.slumSelected === null,
                selected: this.props.slumSelected,
                select: this.slumSelect
            }),
            HTML.button({ onClick: this.go, disabled: this.props.slumSelected === null }, 'Go')
        ])
        return HTML.div({ className: 'page selector-page' }, ...[
            map,
            dialog
        ])
    }

}
