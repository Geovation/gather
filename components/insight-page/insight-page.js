import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Filterbar from '/components/filterbar/filterbar.js'
import Config from '/common/config.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
    }

    metresToPixels(metres, latitude, zoom) {
        const earthCircumference = 40075017
        const latitudeRadians = latitude * (Math.PI / 180)
        const metresPerPixel = earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoom + 8)
        return metres / metresPerPixel
    }

    render() {
        const mapData = Config.get().data.reduce((a1, country) => {
            const files = Object.keys(country.files).reduce((a2, name) => {
                if (name === 'toilets') return a2.concat({
                    name: country.name + 'Toilets',
                    type: 'heatmap',
                    location: country.files[name],
                    paint: {
                        'heatmap-radius': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            8,  this.metresToPixels(250, 0,  8),
                            9,  this.metresToPixels(250, 0,  9),
                            10, this.metresToPixels(250, 0, 10),
                            11, this.metresToPixels(250, 0, 11),
                            12, this.metresToPixels(250, 0, 12),
                            13, this.metresToPixels(250, 0, 13),
                            14, this.metresToPixels(250, 0, 14),
                            15, this.metresToPixels(250, 0, 15),
                            16, this.metresToPixels(250, 0, 16),
                            17, this.metresToPixels(250, 0, 17),
                            18, this.metresToPixels(250, 0, 18)
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
                })
                if (name === 'areas') return a2.concat([
                    {
                        name: country.name + 'Areas',
                        type: 'fill',
                        location: country.files[name],
                        paint: {
                            'fill-color': '#bc7991',
                            'fill-opacity': 0.1
                        }
                    },
                    {
                        name: country.name + 'AreasOutline',
                        type: 'line',
                        location: country.files[name],
                        paint: {
                            'line-color': '#bc7991',
                            'line-width': 2
                        }
                    }
                ])
                else return a2
            }, [])
            return a1.concat(files)
        }, [])
        const map = React.createElement(Map, {
            centre: [36.875, -1.251],
            zoom: 13,
            minZoom: 8,
            maxZoom: 18,
            data: mapData
        })

        // TODO: it will be fixed when the user can select an area from the menu.
        const selectedArea = 0

        return HTML.div({ className: 'page insight-page' }, ...[
            map,
            React.createElement(Filterbar, Config.get().data[selectedArea] )
        ])
    }

}
