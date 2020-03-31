/*
    State

    Deals with everything state related. You find here the messages used in
    this app and the corresponding state transforms.
*/

import { Actions } from './App'
import * as Password from './Password'
import * as Device from './Device'
import { getCurrentWindowWidth } from '../Helper'

//  State  //

interface State {
    readonly title: string
    readonly email: string
    readonly password: Password.Password
    readonly windowWidth: number
    readonly device: Device.Device
}
export const init: State = {
    title: 'Registration',
    email: '',
    password: Password.none,
    windowWidth: getCurrentWindowWidth(),
    device: Device.classify(getCurrentWindowWidth())
}

//  Messages  //

export const Msg: Actions<State> = {
    WindowResized: (state, windowWidth: number) => ({
        ...state,
        windowWidth: windowWidth,
        device: Device.classify(windowWidth)
    }),

    EmailEntered: (state, event) => ({
        ...state,
        email: event.target.value
    }),

    PasswordEntered: (state, event) => ({
        ...state,
        password: Password.create(event.target.value)
    })
}
