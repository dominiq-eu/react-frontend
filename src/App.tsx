import * as React from 'react'
import Input from './Components/Input'

type State = {
    title: string
    inputVal: string
}

const initialState: State = {
    title: 'Hey!',
    inputVal: ''
}

type Msg = 'MsgTitle' | 'MsgInputChange'

const App = () => {
    const [state, setState] = React.useState(initialState)
    const update = (msg: Msg) => (val: string) => {
        let newState: State = Object.assign({}, state)
        switch (msg) {
            case 'MsgTitle':
                newState = Object.assign({}, state, {
                    title: val
                })
                break

            case 'MsgInputChange':
                newState = Object.assign({}, state, {
                    title: val,
                    inputVal: val
                })
                break

            default:
                return
        }
        console.log('State:', newState)
        setState(newState)
    }
    return (
        <div>
            <h1>{state.title}</h1>
            <Input
                value={state.inputVal}
                handleChange={update('MsgInputChange')}
            />
            <button onClick={() => update('MsgTitle')('Hey!')}>click me</button>
        </div>
    )
}

export default App
