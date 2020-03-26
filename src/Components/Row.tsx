/*
    Row.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'

interface Props {
    readonly style?: CSS.Properties
}

const Row = (props: Props) => (
    <div
        style={Object.assign({}, props.style ? props.style : {}, {
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
        })}
    >
        {props.children}
    </div>
)

export default Row
