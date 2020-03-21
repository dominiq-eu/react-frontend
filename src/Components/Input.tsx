import * as React from 'react'

type Props = {
    readonly value: string
    readonly placeholder?: string
    readonly handleChange: (value: string) => void
}

const onChangeHandler = (fn: (string) => void) => (event: MouseEvent) => {
    event.preventDefault()
    fn(event.target.value)
}

const Input = (props: Props) => (
    <input
        type="text"
        name="name"
        onChange={onChangeHandler(props.handleChange)}
        value={props.value}
    />
)

export default Input
