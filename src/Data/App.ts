/*
 */

import * as React from 'react'
import { render } from 'react-dom'

//  Helper  //

// Simple stream type.
// Example code:
//      const s = Stream('Hey')
//      console.log(s) //  'Hey'
//      s('=)')
//      console.log(s) //  '=)'
//
const Stream = (val: NonNullable<any>) => {
    let value = val
    const subscriber = new Set([])
    return {
        value: () => value,
        subscribe: (f: (val: NonNullable<any>) => void) => subscriber.add(f),
        update: (val: NonNullable<any>) => {
            value = val
            subscriber.forEach(f => f(value))
            return value
        }
    }
    // const subscriber = new Set([])
    // function StreamType (val?: NonNullable<any>) {
    //     if (val !== undefined) {
    //         value = val
    //         if (subscriber.length > 0) {
    //             subscriber.forEach(f => f(value))
    //         }
    //     }
    //     return value
    // }
    // StreamType.prototype.valueOf = () => value
    // StreamType.prototype.subscribe = f => subscriber.add(f)
    // return StreamType
}

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
