import * as React from 'react'
import { render } from 'react-dom'

const App = ({ title }) => <h1>{title}</h1>

// render(App({ title: 'Hey' }), document.getElementById('App'))
render(<App title="Hey!" />, document.getElementById('App'))
