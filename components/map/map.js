import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'
import Config from '/common/config.js'

export default class Map extends React.Component {

    constructor(props) {
        super(props)
        this.setup = this.setup.bind(this)

        this.populationLayer = Config.get().populationLayer
        this.map = null
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

    componentWillReceiveProps(newProps) {
        if (newProps.populationLayer) this.map.setLayoutProperty(this.populationLayer.id, 'visibility', 'visible')
        else this.map.setLayoutProperty(this.populationLayer.id, 'visibility', 'none')
    }


    setup(data) {
        this.map = new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: 'https://free.tilehosting.com/styles/basic/style.json?key=' + Config.get().tilehostingKey,
            center: this.props.centre,
            zoom: this.props.zoom,
            minZoom: this.props.minZoom,
            maxZoom: this.props.maxZoom
        })
        this.map.on('load', () => {
            data.forEach(layer => {
                this.map.addLayer({
                    id: layer.name,
                    type: layer.type,
                    source: {
                        type: 'geojson',
                        data: layer.data
                    },
                    paint: layer.paint
                })
            })

            this.map.addLayer(this.populationLayer)
        })
    }

    render() {
        return HTML.div({ className: 'map' })
    }

}
