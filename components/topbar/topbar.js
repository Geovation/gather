import React from 'react'
import { default as HTML } from 'react-dom-factories'
import MD5 from 'md5'
import FetchJsonp from 'fetch-jsonp'
import FirebaseUtils from '/common/firebase-utils.js'

export default class Topbar extends React.Component {

    constructor() {
        super()
        this.state = {
            email: FirebaseUtils.auth().currentUser.email.toLowerCase(),
            name: null,
            avatar: '/components/topbar/user.svg',
            countrySelected: null,
            citySelected: null,
            slumSelected: null
        }
        this.countrySelect = this.countrySelect.bind(this)
        this.citySelect = this.citySelect.bind(this)
        this.slumSelect = this.slumSelect.bind(this)
    }

    countrySelect(country) {
        if (country === this.state.countrySelected) return
        this.setState({
            countrySelected: country,
            citySelected: null,
            slumSelected: null
        })
    }

    citySelect(city) {
        if (city === this.state.citySelected) return
        this.setState({
            citySelected: city,
            slumSelected: null
        })
    }

    slumSelect(slum) {
        this.setState({ slumSelected: slum })
    }

    componentWillMount() {
        const hash = MD5(this.state.email)
        // set the callback function -- the default includes a random number meaning the request will never be cached
        FetchJsonp(`https://www.gravatar.com/${hash}.json`, { jsonpCallbackFunction: 'callback' })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    name: response.entry[0].name.formatted,
                    avatar: response.entry[0].thumbnailUrl
                })
            })
    }

    render() {
        const topbar = HTML.div({ className: 'topbar' }, ...[
            HTML.a({ className: 'logo', href: '/' }, HTML.img({ src: '/components/topbar/logo.svg' })),
            HTML.a({ className: 'selector', href: '/select' }, 'Change location'),
            HTML.span({ className: 'viewing' }, 'Viewing:'),
            HTML.span({ className: 'breadcrumbs' }, ...[
                this.state.countrySelected ? HTML.span({}, this.state.countrySelected.name) : null,
                ...this.state.citySelected ? ['/', HTML.span({}, this.state.citySelected.name)] : [],
                ...this.state.slumSelected ? ['/', HTML.span({}, this.state.slumSelected.name)] : []
            ]),
            HTML.img({ className: 'avatar', src: this.state.avatar }),
            HTML.h2({}, this.state.name ? this.state.name : this.state.email)
        ])
        const page = React.createElement(this.props.page, {
            countrySelected: this.state.countrySelected,
            countrySelect: this.countrySelect,
            citySelected: this.state.citySelected,
            citySelect: this.citySelect,
            slumSelected: this.state.slumSelected,
            slumSelect: this.slumSelect
        })
        return HTML.div({}, ...[
            topbar,
            page
        ])
    }

}
