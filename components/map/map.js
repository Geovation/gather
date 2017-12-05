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

    resolve(item) {
        if (!item.source.location) return Promise.resolve(item)
        const itemCached = this.state.cache.find(cached => cached.id === item.id)
        if (itemCached) return Promise.resolve(itemCached)
        else return fetch(item.source.location)
            .then(response => response.json())
            .then(data => {
                const output = Object.assign(item, { source: { type: item.source.type, data } })
                this.setState({ cache: this.state.cache.concat(output) })
                return output
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
