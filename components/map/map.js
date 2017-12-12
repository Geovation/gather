import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import MapboxGL from 'mapbox-gl'
import Config from '/common/config.js'

export default class Map extends React.Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            data: [],
            cache: []
        }
        this.metresToPixels = this.metresToPixels.bind(this)
        this.convert = this.convert.bind(this)
        this.resolve = this.resolve.bind(this)
        this.fit = this.fit.bind(this)
        this.update = this.update.bind(this)
        this.setup = this.setup.bind(this)
    }

    componentDidMount() {
        this.setup()
        this.update(this.props.data)
    }

    componentDidUpdate(prevProps) {
        const dataChanged = this.props.data.map(layer => layer.id).join() !== prevProps.data.map(layer => layer.id).join()
        if (dataChanged) this.update(this.props.data)
    }

    metresToPixels(metres, latitude, zoom) {
        const earthCircumference = 40075017
        const latitudeRadians = latitude * (Math.PI / 180)
        const metresPerPixel = earthCircumference * Math.cos(latitudeRadians) / Math.pow(2, zoom + 8)
        return metres / metresPerPixel
    }

    convert(item) {
        if (item.type !== 'heatmap' || item.paint['heatmap-radius'] === undefined) return item
        if (item.paint['heatmap-radius'][2][0] !== 'zoom') return item
        const latitude = (item.source.data.bbox[1] + item.source.data.bbox[3]) / 2
        const items = item.paint['heatmap-radius'].slice(3)
        const converted = items.map((item, i) => {
            if (i % 2 === 0) return item
            else return this.metresToPixels(item, latitude, items[i - 1])
        })
        const radiusConverted = item.paint['heatmap-radius'].slice(0, 3).concat(converted)
        item.paint['heatmap-radius'] = radiusConverted
        return item
    }

    resolve(item) {
        if (!item.source.location) return Promise.resolve(item)
        const itemCached = this.state.cache.find(cached => cached.id === item.id)
        if (itemCached) return Promise.resolve(itemCached)
        else return fetch(item.source.location)
            .then(response => response.json())
            .then(data => {
                const output = Object.assign(item, { source: { type: item.source.type, data } })
                const converted = this.convert(output)
                this.setState({ cache: this.state.cache.concat(converted) })
                return converted
            })
    }

    fit(data, isInitial) {
        if (data.length === 0) {
            this.map.flyTo({ center: this.props.centre, zoom: this.props.zoom })
            return
        }
        const bounds = new MapboxGL.LngLatBounds()
        data.forEach(item => {
            if (!item.source.data || !item.source.data.bbox) return
            const sw = [item.source.data.bbox[0], item.source.data.bbox[1]]
            const ne = [item.source.data.bbox[2], item.source.data.bbox[3]]
            bounds.extend([sw, ne])
        })
        const duration = isInitial ? 0 : 1000
        this.map.fitBounds(bounds, { padding: this.props.padding, duration })
    }

    update(data) {
        Promise.all(data.map(this.resolve)).then(dataResolved => {
            this.state.data.forEach(item => { // for each existing data item, remove if not in update
                if (!dataResolved.find(each => each.id === item.id)) {
                    this.map.removeLayer(item.id)
                    this.map.removeSource(item.id)
                }
            })
            dataResolved.forEach(item => { // for each new new data item, add if not in existing
                if (!this.map.getLayer(item.id)) {
                    this.map.addLayer(item)
                }
            })
            this.fit(dataResolved, this.state.loading)
            this.setState({ data: dataResolved, loading: false })
        })
    }

    setup() {
        this.map = new MapboxGL.Map({
            container: ReactDOM.findDOMNode(this),
            style: 'https://free.tilehosting.com/styles/basic/style.json?key=' + Config.get().tilehostingKey,
            center: this.props.centre,
            zoom: this.props.zoom || 0,
            minZoom: this.props.minZoom,
            maxZoom: this.props.maxZoom,
            interactive: this.props.isFixed ? !this.props.isFixed : true
        })
    }

    render() {
        if (this.state.loading) {
            return HTML.div({ className: 'map hidden' }, HTML.div({ className: 'loading' }))
        }
        else return HTML.div({ className: 'map' })
    }

}
