import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class Filterbar extends React.Component {

    render() {
        const peoplePerToilet = (this.props.data.population / this.props.data.toilets).toLocaleString()
        const withHandwashing = Math.round((this.props.data.toiletsWithHandwashing / this.props.data.toilets) * 100)
        const withFSM = Math.round((this.props.data.toiletsWithFSM / this.props.data.toilets) * 100)
        return HTML.div({ className: 'filterbar' }, ...[
            HTML.p({}, 'Shared sanitation access:'),
            HTML.p({ className: 'major' }, `${this.props.data.sharedSanitationAccess}%`),
            HTML.h3({}, 'Key investment areas:'),
            HTML.ol({}, ...[
                HTML.li({}, 'New toilets'),
                HTML.li({}, 'Handwashing facilities'),
                HTML.li({}, 'Faecal sludge management services')
            ]),
            HTML.p({ className: 'population'}, 'Population layer',
                HTML.input({
                    type: 'checkbox',
                    checked: this.props.showPopulation,
                    onChange: this.props.togglePopulation
                })),
            HTML.h3({}, 'Statistics:'),
            HTML.ul({}, ...[
                HTML.li({}, `${peoplePerToilet} people per toilet`),
                HTML.li({}, `${withHandwashing}% of toilets have handwashing facilities`),
                HTML.li({}, `${withFSM}% of toilets have faecal sludge management services`)
            ])
        ])
    }

}
