/*
    App.tsx
*/

import * as React from 'react'
import Column from './Components/Column'
import Row from './Components/Row'
import EmailInput from './Components/Input/Email'
import PasswordInput from './Components/Input/Password'
import Sha1 from 'js-sha1'

//
//  State  //
//
type State = {
    readonly title: string
    readonly email: string
    readonly passHash: string
}

const initialState: State = {
    title: 'Login',
    email: '',
    passHash: ''
}

enum Msg {
    ResetButtonPressed,
    EmailEntered,
    PasswordEntered
}

const getState = () => {
    const [state, setState] = React.useState(initialState)
    const update = (msg: Msg) => (val: string) => {
        let newState: State = Object.assign({}, state)
        switch (msg) {
            case Msg.ResetButtonPressed:
                newState = Object.assign({}, state, {
                    title: 'Login',
                    email: '',
                    passHash: ''
                })
                break

            case Msg.EmailEntered:
                newState = Object.assign({}, state, {
                    title: 'Email changed',
                    email: val
                })
                break

            case Msg.PasswordEntered:
                newState = Object.assign({}, state, {
                    title: 'Password changed',
                    passHash: val
                })
                break

            default:
                return
        }
        console.log('State:', newState)
        setState(newState)
    }
    return { state, update }
}

//
//  View  //
//
const App = () => {
    const { state, update } = getState()
    return (
        <div>
            <h1>{state.title}</h1>
            <Column>
                <Row>
                    <EmailInput
                        value={state.email}
                        placeholder="Email"
                        handleChange={update(Msg.EmailEntered)}
                    />
                    <PasswordInput
                        placeholder="Password"
                        handleHash={Sha1}
                        handleChange={update(Msg.PasswordEntered)}
                    />
                </Row>
                <button onClick={() => update(Msg.ResetButtonPressed)('')}>
                    Reset
                </button>
            </Column>
        </div>
    )
}

export default App
