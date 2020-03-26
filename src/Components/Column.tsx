import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}
    >
        {children}
    </div>
)

export default Row
