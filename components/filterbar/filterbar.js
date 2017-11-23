import React from 'react'
import { default as HTML } from 'react-dom-factories'

export default class Filterbar extends React.Component {

    render() {
        return HTML.div({ className: 'filterbar' }, ...[
            HTML.p({}, 'Basic shared sanitation access:'),
            HTML.p({ className: 'major' }, '3%'),
            HTML.h3({}, 'Key investment areas:'),
            HTML.ol({}, ...[
                HTML.li({}, 'New toilets'),
                HTML.li({}, 'Handwashing facilities'),
                HTML.li({}, 'Faecal sludge management services')
            ]),
            HTML.h3({}, 'Statistics:'),
            HTML.ul({}, ...[
                HTML.li({}, '1,800 people per toilet'),
                HTML.li({}, '19% of toilets have handwashing facilities'),
                HTML.li({}, '100% of toilets have faecal sludge management services')
            ])
        ])
    }

}
