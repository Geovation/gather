import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import FirebaseUtils from '/common/firebase-utils.js'

export default class LoginPage extends React.Component {

    constructor() {
        super()
        this.login = this.login.bind(this)
        this.state = {
            disabled: false
        }
    }

    login(email, password) {
        this.setState({ disabled: true })
        FirebaseUtils.auth().signInWithEmailAndPassword(email, password)
            .then(() => Page('/'))
            .catch(error => this.setState({ disabled: false }))
    }

    render() {
        const submit = event => {
            event.preventDefault()
            this.login(event.target.elements.email.value, event.target.elements.password.value)
        }
        return HTML.div({ className: 'page login-page' }, ...[
            HTML.img({ src: '/components/login-page/logo.svg' }),
            HTML.form({ onSubmit: submit }, ...[
                HTML.h2({}, 'Sign in'),
                HTML.fieldset({ disabled: this.state.disabled }, ...[
                    HTML.label({}, 'Email address:', HTML.input({ type: 'email', name: 'email'})),
                    HTML.label({}, 'Password:', HTML.input({ type: 'password', name: 'password'})),
                    HTML.button({ type: 'submit'}, 'Log in')
                ])
            ])
        ])
    }

}
