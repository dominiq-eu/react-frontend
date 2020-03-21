import * as React from 'react'

const Row = ({ children }) => (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column'
        }}
    >
        {children}
    </div>
)

export default Row
