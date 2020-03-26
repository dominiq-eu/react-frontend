/*
    App.tsx
*/

import * as React from 'react'
import * as Password from './Data/Password'
import Column from './Components/Column'
import Row from './Components/Row'
import EmailInput from './Components/Input/Email'
import PasswordInput from './Components/Input/Password'

//
//  State  //
//
interface State {
    readonly title: string
    readonly email: string
    readonly password: Password.Password
}

const initialState: State = {
    title: 'Login',
    email: '',
    password: Password.none
}

enum Msg {
    ResetButtonPressed,
    EmailEntered,
    PasswordEntered
}

const getState = () => {
    const [state, setState] = React.useState(initialState)
    const update = (msg: Msg) => (val: string | Password.Password) => {
        let newState: State = Object.assign({}, state)
        switch (msg) {
            case Msg.ResetButtonPressed:
                newState = Object.assign({}, state, {
                    title: 'Login',
                    email: '',
                    password: Password.none
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
                    password: val
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
        <main>
            <h1>{state.title}</h1>
            <Row>
                <Column>
                    <EmailInput
                        placeholder="Email"
                        value={state.email}
                        required={true}
                        handleChange={update(Msg.EmailEntered)}
                    />
                </Column>
                <Column>
                    <PasswordInput
                        placeholder="Password"
                        password={state.password}
                        required={true}
                        handleChange={update(Msg.PasswordEntered)}
                    />
                    <aside>
                        <ul>
                            <li>
                                {!Password.isNone(state.password) &&
                                state.password.isLongerThan(8)
                                    ? '[x] Longer than 8 chars'
                                    : '[ ] Longer than 8 chars'}
                            </li>

                            <li>
                                {!Password.isNone(state.password) &&
                                state.password.hasLowercaseChar()
                                    ? '[x] Has lowercase'
                                    : '[ ] Has lowercase'}
                            </li>

                            <li>
                                {!Password.isNone(state.password) &&
                                state.password.hasUppercaseChar()
                                    ? '[x] Has uppercase'
                                    : '[ ] Has uppercase'}
                            </li>

                            <li>
                                {!Password.isNone(state.password) &&
                                state.password.hasDecimalChar()
                                    ? '[x] Has decimal'
                                    : '[ ] Has decimal'}
                            </li>

                            <li>
                                {!Password.isNone(state.password) &&
                                state.password.hasSpecialChar()
                                    ? '[x] Has special'
                                    : '[ ] Has special'}
                            </li>
                        </ul>
                    </aside>
                </Column>
            </Row>
            <Row>
                <button onClick={() => update(Msg.ResetButtonPressed)('')}>
                    Reset
                </button>
            </Row>
        </main>
    )
}

export default App
