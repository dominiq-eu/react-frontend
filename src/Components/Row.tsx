import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%'
        }}
    >
        {children}
    </div>
)

export default Row
