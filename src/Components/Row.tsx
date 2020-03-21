import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            'flex-direction': 'row'
        }}
    >
        {children}
    </div>
)

export default Row
