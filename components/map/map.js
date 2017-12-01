import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'
import Config from '/common/config.js'

export default class Map extends React.Component {

    constructor() {
        super()
        this.resolve = this.resolve.bind(this)
        this.setup = this.setup.bind(this)
    }

    componentDidMount() {
        this.resolve()
    }

    shouldComponentUpdate(nextProps) {
        return this.props.data.length !== nextProps.data.length
    }

    componentDidUpdate() {
        this.resolve()
    }

    resolve() {
        const requests = this.props.data.map(item => {
            if (!item.source.location) return Promise.resolve(item)
            else return fetch(item.source.location)
                .then(response => response.json())
                .then(data => Object.assign(item, { source: { type: item.source.type, data } }))
        })
        Promise.all(requests).then(this.setup)
    }

    setup(data) {
        const isMovable = this.props.isFixed ? !this.props.isFixed : true
        const map = new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: 'https://free.tilehosting.com/styles/basic/style.json?key=' + Config.get().tilehostingKey,
            center: this.props.centre,
            zoom: this.props.zoom,
            minZoom: this.props.minZoom,
            maxZoom: this.props.maxZoom,
            scrollZoom: isMovable,
            boxZoom: isMovable,
            dragRotate: isMovable,
            dragPan: isMovable
        })
        map.on('load', () => data.forEach(item => map.addLayer(item)))
    }

    render() {
        return HTML.div({ className: 'map' })
    }

}
