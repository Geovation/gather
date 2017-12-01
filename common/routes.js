import Page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import Topbar from '/components/topbar/topbar.js'
import SelectorPage from '/components/selector-page/selector-page.js'
import InsightPage from '/components/insight-page/insight-page.js'
import LoginForm from '/components/login/login.js'
import FirebaseUtils from '/common/firebase-utils.js'
import Config from '/common/config.js'

export default class Routes {

    constructor() {
        const main = document.querySelector('main')

        function secure(context, next) {
            if (!FirebaseUtils.auth().currentUser) Page.redirect('/login')
            else {
                if (Config.isLoaded) next()
                else Config.load().then(next)
            }
        }

        Page('/', secure, context => Page.redirect('/select'))

        Page('/select', secure, context => {
            const page = React.createElement(Topbar, { page: SelectorPage })
            main.classList.remove('loading')
            ReactDOM.render(page, main)
        })

        Page('/insight', secure, context => {
            const page = React.createElement(Topbar, { page: InsightPage })
            main.classList.remove('loading')
            ReactDOM.render(page, main)
        })

        Page('/login', context => {
            const page = React.createElement(LoginForm, {})
            main.classList.remove('loading')
            ReactDOM.render(page, main)
        })

        Page('*', context => {
            main.classList.remove('loading')
            const error = HTML.div({ className: 'error' }, 'Not found')
            ReactDOM.render(error, main)
        })

        Page()
    }

}
