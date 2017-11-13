import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import Page from 'page'
import MenuPage from '/components/menu-page/menu-page.js'
import InsightPage from '/components/insight-page/insight-page.js'

const main = document.querySelector('main')

Page('/', context => {
    const page = React.createElement(MenuPage, {})
    main.classList.remove('loading')
    ReactDOM.render(HTML.div({}, page), main)
    window.scrollTo(0, 0)
})

Page('/insight', context => {
    const page = React.createElement(InsightPage, {})
    main.classList.remove('loading')
    ReactDOM.render(HTML.div({}, page), main)
    window.scrollTo(0, 0)
})

Page('*', context => {
    main.classList.remove('loading')
    const error = HTML.div({ className: 'error' }, 'Not found')
    ReactDOM.render(error, main)
})

Page()
