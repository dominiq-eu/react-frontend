/*
    App.tsx
*/

import * as React from 'react'

//  Data  //
import { Msg } from './Data/State'
import { Style, Element } from './Data/Style'
import * as Password from './Data/Password'
import * as Device from './Data/Device'

//  Components  //
import { Column } from './Components/Column'
import { RegistrationPage } from './Pages/Registration'

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

export const App = () => {
    const { state, update } = getState()
    React.useEffect(() => updateWindowWidthEffect(update))
    return (
        <Column style={Style(Element.fullHeight())}>
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
                        Device.responsive(
                            {
                                phone: Element.centerX(),
                                tablet: Element.centerXY(),
                                desktop: Element.centerXY()
                            },
                            state.device
                        )
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
                <RegistrationPage state={state} update={update} />
            </main>
        </Column>
    )
}
