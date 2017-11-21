import Page from 'page'
import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Firebase from 'firebase'

export default class LoginPage extends React.Component {

    constructor() {
        super()
        this.state = { disabled: false }
        this.login = this.login.bind(this)
    }

    login(event) {
        event.preventDefault()
        this.setState({ disabled: true })
        Firebase.firebase.auth().signInWithEmailAndPassword(event.target.elements.email.value, event.target.elements.password.value)
            .then(user => {
                Page('/')
            })
            .catch(error => {
                this.setState({ disabled: false })
            })
    }

    render() {
        return HTML.div({ className: 'login-page' },
            HTML.h1({}, 'login page'),
            HTML.form({ onSubmit: this.login },
                HTML.fieldset({ disabled: this.state.disabled },
                    HTML.label({}, 'email:', HTML.input({ type: 'text', name: 'email' })),
                    HTML.label({}, 'password:', HTML.input({ type: 'password', name: 'password' })),
                    HTML.input({ type: 'submit', value: 'login' })
                )
            )
        )
    }

}
