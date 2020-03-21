import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'row'
        }}
    >
        {children}
    </div>
)

export default Row
