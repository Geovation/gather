import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Config from '/components/config.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        const map = React.createElement(Map, {
            centre: [36.875, -1.251],
            zoom: 13,
            data: [
                {
                    name: 'areas',
                    type: 'fill',
                    location: Config.data.areas,
                    paint: {
                        'fill-color': '#bc7991',
                        'fill-opacity': 0.1
                    }
                },
                {
                    name: 'areas-outline',
                    type: 'line',
                    location: Config.data.areas,
                    paint: {
                        'line-color': '#bc7991',
                        'line-width': 2
                    }
                },
                {
                    name: 'sanitation',
                    type: 'heatmap',
                    location: Config.data.sanitation,
                    paint: {}
                }
            ]
        })
        return HTML.div({ className: 'insight-page' }, ...[
            map
        ])
    }

}
