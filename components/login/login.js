import React from 'react'
import { default as HTML } from 'react-dom-factories'
import Page from 'page'

import FirebaseUtils from '/common/firebase-utils.js'
import * as config from '/common/config.js'

export default class LoginForm extends React.Component {
    constructor() {
        super()

        this.state = { disabled : false}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        this.setState({ disabled: true})

        FirebaseUtils.auth().signInWithEmailAndPassword(event.target.elements.email.value, event.target.elements.password.value )
            .then((user) => {
                console.log("logged in ", user)
                config.init().then(() => Page('/'))
            })
            .catch((error) => {
                alert(error)
                this.setState({ disabled: false})
            })

        event.preventDefault()
    }

    render() {
        return HTML.div({ className: 'loginpage' },
            HTML.h1({}, 'login page'),
            HTML.form({ onSubmit: this.handleSubmit},

                HTML.fieldset({disabled: this.state.disabled},
                    HTML.label({}, 'email:', HTML.input({ type: 'text', name: "email"})),
                    HTML.label({}, 'password:', HTML.input({ type: 'password', name: "password"})),
                    HTML.input({ type: 'submit', value: 'login'})
                ) // </fieldset>

            ) // </form>
        ) // </div>
    }
}

