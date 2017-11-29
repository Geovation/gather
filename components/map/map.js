import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'
import Config from '/common/config.js'

export default class Map extends React.Component {

    constructor() {
        super()
        this.setup = this.setup.bind(this)
    }

    componentDidMount() {
        const requests = this.props.data.map(each => {
            return Object.assign(each, { data: fetch(each.location) })
        })
        const responses = requests.map(each => {
            return each.data.then(response => response.json())
                .then(data => Object.assign(each, { data }))
        })
        Promise.all(responses).then(this.setup)
    }

    setup(data) {
        const map = new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: 'https://free.tilehosting.com/styles/basic/style.json?key=' + Config.get().tilehostingKey,
            center: this.props.centre,
            zoom: this.props.zoom,
            minZoom: this.props.minZoom,
            maxZoom: this.props.maxZoom
        })
        map.on('load', () => {
            data.forEach(layer => {
                map.addLayer({
                    id: layer.name,
                    type: layer.type,
                    source: {
                        type: 'geojson',
                        data: layer.data
                    },
                    paint: layer.paint
                })
            })

            // TODO: this needs to be move in the right place.
            // TODO: move this in the config
            const layer = {
                id: "world population",
                type: "raster",
                source: {
                    type: "raster",
                    tiles: [
                        "http://maps.worldpop.org.uk/tilesets/wp-global-100m-ppp-2010-adj/{z}/{x}/{y}.png"
                    ],
                    tileSize: 256
                },
                paint: {
                    "raster-opacity": 0.4
                }
            }
            map.addLayer(layer)
        })
    }

    render() {
        return HTML.div({ className: 'map' })
    }

}
