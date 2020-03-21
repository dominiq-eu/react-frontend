import * as React from 'react'

type State = {
    title: string
    inputVal: string
}

const initialState: State = {
    title: 'Hey!',
    inputVal: ''
}

const App = () => {
    const [state, setState] = React.useState(initialState)
    const updateTitle = (val: string) => {
        const newState = Object.assign({}, state, {
            title: val
        })
        console.log('State:', newState)
        setState(newState)
    }
    return (
        <div>
            <h1>{state.title}</h1>
            <input
                type="text"
                name="Name"
                onChange={e => updateTitle(e.target.value)}
            />
            <button onClick={() => updateTitle('Hey!')}>click me</button>
        </div>
    )
}

export default App
