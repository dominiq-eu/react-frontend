/*
    App.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'
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
    title: 'Registration',
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

const defaultStyle: Readonly<CSS.Properties> = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '0px',
    padding: '0px',
    margin: '0px'
}

//
//  View  //
//
const App = () => {
    const { state, update } = getState()
    return (
        <Column
            style={Object.assign({}, defaultStyle, {
                // Layout //
                height: '100vh'
            })}
        >
            <nav
                style={Object.assign({}, defaultStyle, {
                    // Layout //
                    // Fill fullWidth
                    width: '100%',

                    // Design //
                    height: '59px',
                    backgroundColor: '#000000',
                    color: '#ffffff'
                })}
            >
                <div
                    style={Object.assign({}, defaultStyle, {
                        // Layout //
                        // centerX
                        alignItems: 'center',
                        alignSelf: 'center',

                        // centerY
                        marginTop: 'auto',
                        marginBottom: 'auto',

                        // Design //
                        fontSize: '24px'
                    })}
                >
                    {state.title}
                </div>
            </nav>
            <main
                style={Object.assign({}, defaultStyle, {
                    // Layout //

                    // fullWidth
                    width: '100%',

                    // fullHeight
                    flexGrow: '100000'
                })}
            >
                <div
                    style={Object.assign({}, defaultStyle, {
                        // Layout //
                        // centerX
                        alignItems: 'center',
                        alignSelf: 'center',

                        // centerY
                        marginTop: 'auto',
                        marginBottom: 'auto',

                        // width
                        width: '600px',

                        // Design //
                        padding: '16px',
                        borderStyle: 'solid',
                        borderWidth: '2px',
                        borderColor: '#000000'
                    })}
                >
                    <Row
                        style={Object.assign({}, defaultStyle, {
                            // columnGap: '16px',
                            // rowGap: '16px'
                        })}
                    >
                        <Column
                            style={Object.assign({}, defaultStyle, {
                                // Layout //
                                paddingRight: '8px'
                            })}
                        >
                            <EmailInput
                                style={Object.assign({}, defaultStyle, {
                                    // Design //
                                    height: '52px',
                                    borderStyle: 'solid',
                                    borderWidth: '2px',
                                    borderColor: '#000000'
                                })}
                                placeholder="Email"
                                value={state.email}
                                required={true}
                                handleChange={update(Msg.EmailEntered)}
                            />
                        </Column>
                        <Column
                            style={Object.assign({}, defaultStyle, {
                                // Layout //
                                paddingLeft: '8px'
                            })}
                        >
                            <PasswordInput
                                style={Object.assign({}, defaultStyle, {
                                    // Design //
                                    height: '52px',
                                    borderStyle: 'solid',
                                    borderWidth: '2px',
                                    borderColor: '#000000'
                                })}
                                placeholder="Password"
                                password={state.password}
                                required={true}
                                handleChange={update(Msg.PasswordEntered)}
                            />
                            <aside>
                                <Column
                                    style={Object.assign({}, defaultStyle, {
                                        // Layout //
                                        paddingTop: '13px',

                                        // Design //
                                        fontSize: '18px'
                                    })}
                                >
                                    <div>
                                        {!Password.isNone(state.password) &&
                                        state.password.isLongerThan(8)
                                            ? '[x] 8+ characters'
                                            : '[ ] 8+ characters'}
                                    </div>

                                    <div>
                                        {!Password.isNone(state.password) &&
                                        state.password.hasLowercaseChar()
                                            ? '[x] lowercase letter'
                                            : '[ ] lowercase letter'}
                                    </div>

                                    <div>
                                        {!Password.isNone(state.password) &&
                                        state.password.hasUppercaseChar()
                                            ? '[x] uppercase letter'
                                            : '[ ] uppercase letter'}
                                    </div>

                                    <div>
                                        {!Password.isNone(state.password) &&
                                        state.password.hasDecimalChar()
                                            ? '[x] number'
                                            : '[ ] number'}
                                    </div>

                                    <div>
                                        {!Password.isNone(state.password) &&
                                        state.password.hasSpecialChar()
                                            ? '[x] special character'
                                            : '[ ] special character'}
                                    </div>
                                </Column>
                            </aside>
                            <div
                                style={Object.assign({}, defaultStyle, {
                                    // Layout
                                    paddingTop: '32px',
                                    paddingBottom: '16px'
                                })}
                            >
                                <button
                                    style={Object.assign({}, defaultStyle, {
                                        // Layout //
                                        // alignRight
                                        // marginLeft: 'auto',

                                        // Design //
                                        width: '100%',
                                        height: '52px',
                                        backgroundColor: '#000000',
                                        color: '#ffffff',

                                        // Text
                                        alignItems: 'center',
                                        alignContent: 'center',
                                        justifyItems: 'center',
                                        justifyContent: 'center'
                                    })}
                                    onClick={() =>
                                        update(Msg.ResetButtonPressed)('')
                                    }
                                >
                                    Submit
                                </button>
                            </div>
                        </Column>
                    </Row>
                </div>
            </main>
        </Column>
    )
}

export default App
