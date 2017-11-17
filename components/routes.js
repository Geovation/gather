import React from 'react'
import ReactDOM from 'react-dom'
import { default as HTML } from 'react-dom-factories'
import Page from 'page'
import Topbar from '/components/topbar/topbar.js'
import MenuPage from '/components/menu-page/menu-page.js'
import InsightPage from '/components/insight-page/insight-page.js'
import LoginForm from '/components/login/login.js'
import Firebase from 'firebase'

const main = document.querySelector('main')
const topbar = React.createElement(Topbar, {})

// Firebase
Firebase.firebase.initializeApp({
    apiKey: 'AIzaSyBSJzvEjE66uQpjKw7hRDJWxHoyJ_lID_M',
    authDomain: 'gather-f7fb3.firebaseapp.com',
    projectId: 'gather-f7fb3',
    storageBucket: 'gather-f7fb3.appspot.com'
})

const app = Firebase.firebase.app()
const features = ['auth', 'storage'].filter(feature => typeof app[feature] === 'function')
console.log(`Firebase SDK loaded with ${features.join(', ')}`)

let user = null;

Firebase.firebase.auth().onAuthStateChanged((_user) => {

    // TODO: why it is not propagating ???
    user = _user
    if (user) {
        console.log("User logged in: ", user)
    } else {
        // No user is signed in.
        console.log("No user logged in")
    }
});
// Firebase END

// Routing
Page('/', context => {
    const page = React.createElement(MenuPage, { user })
    main.classList.remove('loading')
    ReactDOM.render(HTML.div({}, page), main)
    window.scrollTo(0, 0)
})

Page('/insight', context => {
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
