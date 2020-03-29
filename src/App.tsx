/*
    App.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'

//  Data  //
import * as Password from './Data/Password'
import * as Device from './Data/Device'
import { Style, Element, Border } from './Data/Style'

//  Components  //
import Column from './Components/Column'
import Row from './Components/Row'
import EmailInput from './Components/Input/Email'
import PasswordInput from './Components/Input/Password'

//  Effects  //

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

//  State  //

interface State {
    readonly title: string
    readonly email: string
    readonly password: Password.Password
    readonly windowWidth: number
    readonly device: Device.Device
}

const initialState: State = {
    title: 'Registration',
    email: '',
    password: Password.none,
    windowWidth: getCurrentWindowWidth(),
    device: Device.classify(getCurrentWindowWidth())
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
                    device: Device.classify(val as number)
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

//  View  //

const RegistrationEmailInput = ({ state, update }) => (
    <Column
        style={Style(
            Element.paddingEach({
                top: 16,
                bottom: 0,
                left: 8,
                right: 8
            })
        )}
    >
        <div style={Style({ paddingBottom: '16px' })}>Email</div>
        <EmailInput
            style={Style([
                Element.height(52).padding(16),
                Border.solid()
                    .width(2)
                    .color('black')
            ])}
            placeholder="Email"
            value={state.email}
            required={true}
            handleChange={update(Msg.EmailEntered)}
        />
    </Column>
)

const RegistrationPasswordInput = ({ state, update }) => (
    <Column
        style={Style(
            Element.paddingEach({
                top: 16,
                bottom: 0,
                left: 8,
                right: 8
            })
        )}
    >
        <div style={Style({ paddingBottom: '16px' })}>Password</div>
        <PasswordInput
            style={Style([
                Element.height(52).padding(16),
                Border.solid()
                    .width(2)
                    .color('black')
            ])}
            placeholder="Password"
            password={state.password}
            required={true}
            handleChange={update(Msg.PasswordEntered)}
        />
        <aside>
            <Column style={Style([{ paddingTop: '13px' }])}>
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

const RegistrationSubmitButton = ({ style }: { style?: CSS.Properties }) => (
    <Column
        style={Style([
            Element
                //
                .paddingEach({
                    top: 32,
                    bottom: 0,
                    left: 8,
                    right: 8
                })
                .alignBottom(),
            style ? style : {}
        ])}
    >
        <button
            style={Style(
                Element
                    //
                    .fgColor('white')
                    .bgColor('black')
                    //
                    .fillWidth()
                    .height(52)
                    .centerX()
                    .centerY()
            )}
        >
            Submit
        </button>
    </Column>
)

const RegistrationForm = ({ state, update }) => (
    <div
        style={Style([
            Element.centerX()
                .centerY()
                .width(
                    Device.responsive(
                        { desktop: 600, tablet: 600, phone: 288 },
                        state.device
                    )
                )
                .paddingEach({ top: 16, bottom: 32, left: 8, right: 8 }),
            Border.solid()
                .width(2)
                .color('black')
        ])}
    >
        {Device.responsive(
            {
                desktop: (
                    <Column>
                        <Row>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationPasswordInput
                                state={state}
                                update={update}
                            />
                        </Row>
                        <Row reverse={true}>
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
                    <Row>
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <Column>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationSubmitButton />
                        </Column>
                    </Row>
                ),
                phone: (
                    <Column>
                        <RegistrationEmailInput state={state} update={update} />
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <RegistrationSubmitButton />
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
        <Column style={Style([Element.fullHeight()])}>
            <nav
                style={Style(
                    Element.bgColor('black')
                        .fgColor('white')
                        .fillWidth()
                        .height(59)
                )}
            >
                <div
                    style={Style([
                        { fontSize: '24px' },
                        Element.centerX().centerY()
                    ])}
                >
                    Registration
                </div>
            </nav>
            <main
                style={Style([
                    { fontSize: '18px' },
                    Element.fullWidth().fullHeight()
                ])}
            >
                <RegistrationForm state={state} update={update} />
            </main>
        </Column>
    )
}

export default App
