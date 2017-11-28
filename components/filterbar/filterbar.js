import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class Filterbar extends React.Component {

    render() {
        return HTML.div({ className: 'filterbar' }, ...[
            HTML.p({}, 'Basic shared sanitation access:'),
            HTML.p({ className: 'major' }, `${this.props.basicSharedSanitationAccess} %`),
            HTML.h3({}, 'Key investment areas:'),
            HTML.ol({}, ...[
                HTML.li({}, 'New toilets'),
                HTML.li({}, 'Handwashing facilities'),
                HTML.li({}, 'Faecal sludge management services')
            ]),
            HTML.h3({}, 'Statistics:'),
            HTML.ul({}, ...[
                HTML.li({}, `${this.props.peoplePerToilet.toLocaleString()} people per toilet`),
                HTML.li({}, `${this.props.handwashingFacilities}% of toilets have handwashing facilities`),
                HTML.li({}, `${this.props.faecalSludgeManagementServices}% of toilets have faecal sludge management services`)
            ])
        ])
    }

}
