/*
    Column.tsx
*/

import * as React from 'react'
import * as CSS from 'csstype'
import { Style, Element } from '../Data/Style'

interface Props {
    readonly style?: CSS.Properties
}

const Column: React.FunctionComponent<Props> = ({ style, children }) => (
    <div style={Style([style ? style : {}, Element.fillWidth()])}>
        {children}
    </div>
)

export default Column
