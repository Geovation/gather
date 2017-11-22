import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Config from '/common/config.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
        this.state = {
            config: null
        }
        Config.get().then(config => this.setState({ config }))
    }

    metersToPixels(meters, latitude, zoom) {
        const earthCircumference = 40075017
        const latitudeRadians = latitude * (Math.PI/180)
        const metersPerPixel = earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoom + 8)
        return meters / metersPerPixel
    }

    render() {
        const map = !this.state.config ? null : React.createElement(Map, {
            centre: [36.875, -1.251],
            zoom: 13,
            minZoom: 8,
            maxZoom: 18,
            data: [
                {
                    name: 'areas',
                    type: 'fill',
                    location: this.state.config.data.areas,
                    paint: {
                        'fill-color': '#bc7991',
                        'fill-opacity': 0.1
                    }
                },
                {
                    name: 'areas-outline',
                    type: 'line',
                    location: this.state.config.data.areas,
                    paint: {
                        'line-color': '#bc7991',
                        'line-width': 2
                    }
                },
                {
                    name: 'sanitation',
                    type: 'heatmap',
                    location: this.state.config.data.sanitation,
                    paint: {
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            8,  this.metersToPixels(250, 0,  8),
                            9,  this.metersToPixels(250, 0,  9),
                            10, this.metersToPixels(250, 0, 10),
                            11, this.metersToPixels(250, 0, 11),
                            12, this.metersToPixels(250, 0, 12),
                            13, this.metersToPixels(250, 0, 13),
                            14, this.metersToPixels(250, 0, 14),
                            15, this.metersToPixels(250, 0, 15),
                            16, this.metersToPixels(250, 0, 16),
                            17, this.metersToPixels(250, 0, 17),
                            18, this.metersToPixels(250, 0, 18)
                        ],
                        'heatmap-color': [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density'],
                            0, 'rgb(45, 52, 112)',
                            0.005, 'rgb(45, 52, 112)',
                            0.01, 'rgba(65, 124, 197, 0.2)'
                        ]
                    }
                }
            ]
        })
        return HTML.div({ className: 'insight-page' }, ...[
            map
        ])
    }

}
