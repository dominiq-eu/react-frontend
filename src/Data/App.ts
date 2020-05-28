/*
 */

import * as React from 'react'
import { render } from 'react-dom'
import { Stream } from './Stream'

//  Helper  //

const register = effects => () => {
    const unregisterList = effects
        .map(e => e())
        .filter(e => typeof e === 'function')
    return () => {
        unregisterList.forEach(e => e())
    }
}

//  State Management  //

export type Action<S> = (state: S, event: NonNullable<any>) => S
export interface Actions<S> {
    [key: string]: Action<S>
}

//  Update  //
const State = Stream({})

export let update = action => event => {
    if (event.preventDefault !== undefined) {
        event.preventDefault()
    }
    const newState = action(State.value(), event)
    State.update(newState)
}

//  App  //

export const App = config => {
    const AppView = () => {
        const [state, setState] = React.useState(State.value())
        State.subscribe(setState)
        React.useEffect(register(config.effects))
        return config.view(state)
    }

    State.update(config.init)
    render(React.createElement(AppView), config.node)
}
