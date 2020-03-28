/*
    Column.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'

interface Props {
    readonly style?: CSS.Properties
}

const Column: React.FunctionComponent<Props> = ({ style, children }) => (
    <div
        style={Object.assign({}, style ? style : {}, {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        })}
    >
        {children}
    </div>
)

export default Column
