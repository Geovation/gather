import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import Page from 'page'

import Topbar from '/components/topbar/topbar.js'
import MenuPage from '/components/menu-page/menu-page.js'
import InsightPage from '/components/insight-page/insight-page.js'
import LoginForm from '/components/login/login.js'

import * as firebase from '/common/firebase.js'
// import * as config from "./config";

// Routing
function init() {
        const main = document.querySelector('main')
        const topbar = React.createElement(Topbar, {})

        function secure(context, next) {
            if (!firebase.auth().currentUser) {
                alert("You need to log in to see this page")
                Page.redirect('/login')
            } else {
                next()
            }
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
