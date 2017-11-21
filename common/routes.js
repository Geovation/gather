import Page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'

import Topbar from '/components/topbar/topbar.js'
import MenuPage from '/components/menu-page/menu-page.js'
import InsightPage from '/components/insight-page/insight-page.js'
import LoginForm from '/components/login/login.js'

import * as Firebase from '/common/firebase.js'

function init() {
    const main = document.querySelector('main')
    const topbar = React.createElement(Topbar, {})

    function secure(_, next) {
        if (!Firebase.auth().currentUser) Page.redirect('/login')
        else next()
    }

    Page('/', secure, context => {
        const page = React.createElement(MenuPage)
        main.classList.remove('loading')
        ReactDOM.render(HTML.div({}, page), main)
        window.scrollTo(0, 0)
    })

    Page('/insight', secure, context => {
        const page = React.createElement(InsightPage, {})
        main.classList.remove('loading')
        ReactDOM.render(HTML.div({}, topbar, page), main)
        window.scrollTo(0, 0)
    })

    Page('/login', context => {
        const loginForm = React.createElement(LoginForm, {})

        main.classList.remove('loading')
        ReactDOM.render(loginForm, main)
    })

    Page('*', context => {
        main.classList.remove('loading')
        const error = HTML.div({ className: 'error' }, 'Not found')
        ReactDOM.render(error, main)
    })

    Page()
}

export {
    init
}
