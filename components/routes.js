import Page from 'page'
import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import Topbar from '/components/topbar/topbar.js'
import LoginPage from '/components/login-page/login-page.js'
import MenuPage from '/components/menu-page/menu-page.js'
import InsightPage from '/components/insight-page/insight-page.js'
import Firebase from 'firebase'
import Config from '/components/config.js'

const main = document.querySelector('main')
const topbar = React.createElement(Topbar, {})

Firebase.firebase.initializeApp(Config.firebase)
const firebase = Firebase.firebase.app()
Firebase.firebase.auth().onAuthStateChanged(user => {
    localStorage.setItem('user', user)
})

function secure(_, next) {
    const user = localStorage.getItem('user')
    if (user) next(user)
    else Page('/login')
}

Page('/', secure, context => {
    const page = React.createElement(MenuPage, { user: context.user })
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
    const page = React.createElement(LoginPage, {})
    main.classList.remove('loading')
    ReactDOM.render(page, main)
    window.scrollTo(0, 0)
})

Page('*', context => {
    main.classList.remove('loading')
    const error = HTML.div({ className: 'error' }, 'Not found')
    ReactDOM.render(error, main)
})

Page()
