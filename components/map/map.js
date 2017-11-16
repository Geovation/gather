import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'

export default class Map extends React.Component {

    constructor() {
        super()
        this.setup = this.setup.bind(this)
    }

    componentDidMount() {
        const requests = this.props.data.map(each => {
            return Object.assign(each, { data: fetch(each.location, { mode: 'no-cors' }) })
        })
        const responses = requests.map(each => {
            return each.data.then(response => response.json())
                .then(data => Object.assign(each, { data }))
        })
        Promise.all(responses).then(this.setup)
    }

    setup(data) {
        const sources = data.map(each => {
            const output = {
                type: 'geojson',
                data: each.data
            }
            return { ['data-' + each.name]: output }
        })
        const layers = data.map(each => {
            return {
                id: each.name,
                type: each.type,
                source: 'data-' + each.name
            }
        })
        new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: {
                version: 8,
                sources: {
                    'osm': {
                        type: 'raster',
                        tiles: ['http://tile.osm.org/{z}/{x}/{y}.png'],
                        tileSize: 256
                    },
                    ...Object.assign(...sources)
                },
                layers: [
                    {
                        id: 'tiles',
                        type: 'raster',
                        source: 'osm'
                    },
                    ...layers
                ]
            },
            center: this.props.centre,
            zoom: this.props.zoom
        })
    }

    render() {
        return HTML.div({ className: 'map' })
    }

}
