/*
    Row.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'
import { Style, Element } from '../Data/Style'

interface Props {
    readonly style?: CSS.Properties
    readonly reverse?: boolean
}

export const Row: React.FunctionComponent<Props> = ({
    style,
    reverse,
    children
}) => (
    <div
        style={Style([
            Element.fillWidth(),
            style ? style : {},
            { flexDirection: reverse ? 'row-reverse' : 'row' }
        ])}
    >
        {children}
    </div>
)
