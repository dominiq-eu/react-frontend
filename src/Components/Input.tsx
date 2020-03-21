import * as React from 'react'

type Props = {
    readonly value: string
    readonly placeholder?: string
    readonly handleChange: (value: string) => void
}

const onChangeHandler = (fn: (string) => void) => (e: MouseEvent) => {
    event.preventDefault()
    fn(e.target.value)
}

const Input = (props: Props) => (
    <input
        style={{
            width: '100%'
        }}
        type="text"
        name="name"
        onChange={onChangeHandler(props.handleChange)}
        value={props.value}
    />
)

export default Input
