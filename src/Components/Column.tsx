/*
    Column.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'

interface Props {
    readonly style?: CSS.Properties
}

const Column = (props: Props) => (
    <div
        style={Object.assign({}, props.style ? props.style : {}, {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        })}
    >
        {props.children}
    </div>
)

export default Column
