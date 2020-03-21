import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            'flex-direction': 'column'
        }}
    >
        {children}
    </div>
)

export default Row
