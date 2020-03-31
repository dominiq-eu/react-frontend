/*
 */

import * as React from 'react'
import { render } from 'react-dom'

//  State Management  //

export type Action<S> = (state: S, event: NonNullable<any>) => S
export interface Actions<S> {
    [key: string]: Action<S>
}

//  Update  //

export let update = null

//  Helper  //

const register = effects => () => {
    const unregisterList = effects
        .map(e => e())
        .filter(e => typeof e === 'function')
    return () => {
        unregisterList.forEach(e => e())
    }
}

//  App  //

export const App = config => {
    const AppView = () => {
        const [state, setState] = React.useState(config.init)
        React.useEffect(register(config.effects))
        update = action => event => {
            if (event.preventDefault !== undefined) {
                event.preventDefault()
            }
            const newState = action(state, event)
            setState(newState)
        }
        return config.view(state)
    }
    render(React.createElement(AppView), config.node)
}
