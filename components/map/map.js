import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'

export default class Map extends React.Component {

    componentDidMount() {
        new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: {
                version: 8,
                sources: {
                    'osm': {
                        type: 'raster',
                        tiles: ['http://tile.osm.org/{z}/{x}/{y}.png'],
                        tileSize: 256
                    }
                },
                layers: [
                    {
                        id: 'tiles',
                        type: 'raster',
                        source: 'osm'
                    }
                ]
            },
            center: [36.875, -1.251],
            zoom: 13
        })
    }

    render() {
        return HTML.div({ className: 'map' })
    }

}
