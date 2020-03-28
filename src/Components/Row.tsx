/*
    Row.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'

interface Props {
    readonly style?: CSS.Properties
    readonly reverse?: boolean
}

const Row: React.FunctionComponent<Props> = ({ style, reverse, children }) => (
    <div
        style={Object.assign({}, style ? style : {}, {
            display: 'flex',
            flexDirection: reverse ? 'row-reverse' : 'row',
            width: '100%'
        })}
    >
        {children}
    </div>
)

export default Row
