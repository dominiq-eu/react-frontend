/*
    App.tsx

    Next: Make responsive
*/

import * as React from 'react'
import * as CSS from 'csstype'
import * as Password from './Data/Password'
import Column from './Components/Column'
import Row from './Components/Row'
import EmailInput from './Components/Input/Email'
import PasswordInput from './Components/Input/Password'

//
//  Device Type  //
//
enum Device {
    Phone = 320,
    Tablet = 768,
    Desktop = 1024
}

const classifyDevice = (windowWidth: number): Device => {
    if (windowWidth >= Device.Desktop) {
        return Device.Desktop
    } else if (windowWidth >= Device.Tablet) {
        return Device.Tablet
    } else {
        return Device.Phone
    }
}

const responsive = ({ desktop, tablet, phone }, device: Device) => {
    switch (device) {
        case Device.Desktop:
            return desktop
        case Device.Tablet:
            return tablet
        default:
            return phone
    }
}

//
//  Effects  //
//
const getCurrentWindowWidth = () =>
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth

const updateWindowWidthEffect = update => {
    // Register resize event and debounce the state update a little bit, to
    // prevent too many events, too fast state updates and too fast re-renders.
    let timeoutId = null
    const resizeListener = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(
            () => update(Msg.WindowResized)(getCurrentWindowWidth()),
            50
        )
        // update(Msg.WindowResized)(getCurrentWindowWidth())
    }
    window.addEventListener('resize', resizeListener)
    return () => window.removeEventListener('resize', resizeListener)
}

//
//  State  //
//
interface State {
    readonly title: string
    readonly email: string
    readonly password: Password.Password
    readonly windowWidth: number
    readonly device: Device
}

const initialState: State = {
    title: 'Registration',
    email: '',
    password: Password.none,
    windowWidth: getCurrentWindowWidth(),
    device: classifyDevice(getCurrentWindowWidth())
}

enum Msg {
    WindowResized,
    EmailEntered,
    PasswordEntered
}

const getState = () => {
    const [state, setState] = React.useState(initialState)
    const update = (msg: Msg) => (val: string | Password.Password | number) => {
        let newState: State = Object.assign({}, state)
        switch (msg) {
            case Msg.WindowResized:
                newState = Object.assign({}, state, {
                    windowWidth: val as number,
                    device: classifyDevice(val as number)
                })
                break

            case Msg.EmailEntered:
                newState = Object.assign({}, state, {
                    email: val as string
                })
                break

            case Msg.PasswordEntered:
                newState = Object.assign({}, state, {
                    password: val as Password.Password
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
const RegistrationEmailInput = ({ state, update }) => (
    <Column
        style={Object.assign({}, defaultStyle, {
            // Layout //
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '16px'
        })}
    >
        <div
            style={Object.assign({}, defaultStyle, {
                // paddingTop: '16px',
                paddingBottom: '16px'
            })}
        >
            Email
        </div>
        <EmailInput
            style={Object.assign({}, defaultStyle, {
                // Design //
                height: '52px',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#000000',
                padding: '16px'
            })}
            placeholder="Email"
            value={state.email}
            required={true}
            handleChange={update(Msg.EmailEntered)}
        />
    </Column>
)

const RegistrationPasswordInput = ({ state, update }) => (
    <Column
        style={Object.assign({}, defaultStyle, {
            // Layout //
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingTop: '16px'
        })}
    >
        <div
            style={Object.assign({}, defaultStyle, {
                // paddingTop: '16px',
                paddingBottom: '16px'
            })}
        >
            Password
        </div>
        <PasswordInput
            style={Object.assign({}, defaultStyle, {
                // Design //
                height: '52px',
                borderStyle: 'solid',
                borderWidth: '2px',
                borderColor: '#000000',
                padding: '16px'
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
                    paddingTop: '13px'
                })}
            >
                <div>
                    {!Password.isNone(state.password) &&
                    state.password.isLongerThan(8)
                        ? '✔ '
                        : '✘ '}
                    8+ characters
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasLowercaseChar()
                        ? '✔ '
                        : '✘ '}
                    lowercase letter
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasUppercaseChar()
                        ? '✔ '
                        : '✘ '}
                    uppercase letter
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasDecimalChar()
                        ? '✔ '
                        : '✘ '}
                    number
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasSpecialChar()
                        ? '✔ '
                        : '✘ '}
                    special character
                </div>
            </Column>
        </aside>
    </Column>
)

const RegistrationSubmitButton = ({ style }: { style: CSS.Properties }) => (
    <Column
        style={Object.assign(
            {},
            defaultStyle,
            {
                // Layout //
                paddingTop: '32px',
                paddingLeft: '8px',
                paddingRight: '8px',
                marginTop: 'auto'
            },
            style ? style : {}
        )}
    >
        <button
            style={Object.assign({}, defaultStyle, {
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
        >
            Submit
        </button>
    </Column>
)

const RegistrationForm = ({ state, update }) => (
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
            width: responsive(
                {
                    desktop: '600px',
                    tablet: '600px',
                    phone: '288px'
                },
                state.device
            ),

            // Design //
            paddingTop: '16px',
            paddingBottom: '32px',
            paddingLeft: '8px',
            paddingRight: '8px',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: '#000000'
        })}
    >
        {responsive(
            {
                desktop: (
                    <Column style={Object.assign({}, defaultStyle)}>
                        <Row style={Object.assign({}, defaultStyle)}>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationPasswordInput
                                state={state}
                                update={update}
                            />
                        </Row>
                        <Row
                            style={Object.assign({}, defaultStyle)}
                            reverse={true}
                        >
                            <RegistrationSubmitButton
                                style={{
                                    width: '50%',
                                    maxWidth: '50%'
                                }}
                            />
                        </Row>
                    </Column>
                ),
                tablet: (
                    <Row style={Object.assign({}, defaultStyle)}>
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <Column style={Object.assign({}, defaultStyle)}>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationSubmitButton style={{}} />
                        </Column>
                    </Row>
                ),
                phone: (
                    <Column style={Object.assign({}, defaultStyle)}>
                        <RegistrationEmailInput state={state} update={update} />
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <RegistrationSubmitButton style={{}} />
                    </Column>
                )
            },
            state.device
        )}
    </div>
)

const App = () => {
    const { state, update } = getState()
    React.useEffect(() => updateWindowWidthEffect(update))
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
                    Registration
                </div>
            </nav>
            <main
                style={Object.assign({}, defaultStyle, {
                    // Layout //
                    // fullWidth
                    width: '100%',

                    // fullHeight
                    flexGrow: '100000',

                    // Design //
                    fontSize: '18px'
                })}
            >
                <RegistrationForm state={state} update={update} />
            </main>
        </Column>
    )
}

export default App
