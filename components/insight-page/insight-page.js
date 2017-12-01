import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Filterbar from '/components/filterbar/filterbar.js'
import Config from '/common/config.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
        this.state = {
            showPopulation: false
        }
        this.togglePopulation = this.togglePopulation.bind(this)
    }

    metresToPixels(metres, latitude, zoom) {
        const earthCircumference = 40075017
        const latitudeRadians = latitude * (Math.PI / 180)
        const metresPerPixel = earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoom + 8)
        return metres / metresPerPixel
    }

    togglePopulation() {
        this.setState({ showPopulation: !this.state.showPopulation })
    }

    render() {
        if (this.props.slumSelected === null) {
            Page.redirect('/select')
            return HTML.div({ className: 'loading' })
        }
        const dataLayers = Object.keys(this.props.slumSelected.files).reduce((a, name) => {
            if (name === 'toilets') return a.concat({
                id: this.props.slumSelected.name + 'Toilets',
                type: 'heatmap',
                source: { type: 'geojson', location: this.props.slumSelected.files[name] },
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
            if (name === 'outline') return a.concat([
                {
                    id: this.props.slumSelected.name + 'Outline',
                    type: 'fill',
                    source: { type: 'geojson', location: this.props.slumSelected.files[name] },
                    paint: {
                        'fill-color': '#bc7991',
                        'fill-opacity': 0.1
                    }
                },
                {
                    id: this.props.slumSelected.name + 'OutlineBorder',
                    type: 'line',
                    source: { type: 'geojson', location: this.props.slumSelected.files[name] },
                    paint: {
                        'line-color': '#bc7991',
                        'line-width': 2
                    }
                }
            ])
            return a
        }, [])
        const populationLayer = {
            id: 'Population',
            type: 'raster',
            source: {
                type: 'raster',
                tiles: ['http://maps.worldpop.org.uk/tilesets/wp-global-100m-ppp-2010-adj/{z}/{x}/{y}.png'],
                tileSize: 256
            },
            paint: {
                'raster-opacity': 0.4
            }
        }
        const map = React.createElement(Map, {
            centre: [36.875, -1.251],
            zoom: 13,
            minZoom: 8,
            maxZoom: 18,
            data: this.state.showPopulation ? [...dataLayers, populationLayer] : dataLayers
        })
        const filterbar = React.createElement(Filterbar, {
            data: this.props.slumSelected.stats,
            showPopulation: this.state.showPopulation,
            togglePopulation: this.togglePopulation
        })
        return HTML.div({ className: 'page insight-page' }, ...[
            map,
            filterbar
        ])
    }

}
