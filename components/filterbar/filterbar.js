import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class Filterbar extends React.Component {

    render() {
        return HTML.div({ className: 'filterbar' }, ...[
            HTML.p({}, 'Shared sanitation access:'),
            HTML.p({ className: 'major' }, `${this.props.data.basicSharedSanitationAccess} %`),
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
                HTML.li({}, `${this.props.data.peoplePerToilet.toLocaleString()} people per toilet`),
                HTML.li({}, `${this.props.data.handwashingFacilities}% of toilets have handwashing facilities`),
                HTML.li({}, `${this.props.data.faecalSludgeManagementServices}% of toilets have faecal sludge management services`)
            ])
        ])
    }

}
