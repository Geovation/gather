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

    render() {
        const map = !this.state.config ? null : React.createElement(Map, {
            centre: [36.875, -1.251],
            zoom: 13,
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
                        'heatmap-radius': 25,
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
