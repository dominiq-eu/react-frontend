import * as React from 'react'
import Input from './Components/Input'
import Column from './Components/Column'
import Row from './Components/Row'

type State = {
    title: string
    email: string
    pass: string
}

const initialState: State = {
    title: 'Hey!',
    email: '',
    pass: ''
}

type Msg = 'MsgTitle' | 'MsgEmailChange' | 'MsgPassChange'

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

            case 'MsgEmailChange':
                newState = Object.assign({}, state, {
                    title: 'Email changed',
                    email: val
                })
                break

            case 'MsgPassChange':
                newState = Object.assign({}, state, {
                    title: 'Password changed',
                    pass: val
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
            <Column>
                <Row>
                    <Input
                        value={state.email}
                        handleChange={update('MsgEmailChange')}
                    />
                    <Input
                        value={state.pass}
                        handleChange={update('MsgPassChange')}
                    />
                </Row>
                <button onClick={() => update('MsgTitle')('Hey!')}>
                    click me
                </button>
            </Column>
        </div>
    )
}

export default App
