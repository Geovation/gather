import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Map from '/components/map/map.js'
import Filterbar from '/components/filterbar/filterbar.js'

export default class InsightPage extends React.Component {

    constructor() {
        super()
        this.state = {
            showPopulation: false
        }
        this.togglePopulation = this.togglePopulation.bind(this)
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
                        8,  25,
                        9,  25,
                        10, 25,
                        11, 25,
                        12, 25,
                        13, 25,
                        14, 25,
                        15, 25,
                        16, 25,
                        17, 25,
                        18, 25,
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
                tiles: ['https://www.geodata.soton.ac.uk/tilesets/wp-global-100m-ppp-2010-adj/{z}/{x}/{y}.png'],
                tileSize: 256
            },
            paint: {
                'raster-opacity': 0.4
            }
        }
        const map = React.createElement(Map, {
            minZoom: 8,
            maxZoom: 18,
            data: this.state.showPopulation ? [...dataLayers, populationLayer] : dataLayers,
            padding: {
                top: 85,
                bottom: 25,
                left: 25,
                right: 325
            }
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
