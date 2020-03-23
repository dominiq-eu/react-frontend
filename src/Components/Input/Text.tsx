import * as React from 'react'

type Props = {
    readonly value: string
    readonly handleChange: (value: string) => void
    readonly placeholder?: string
}

const onChangeHandler = (fn: (string) => void) => event => {
    event.preventDefault()
    fn(event.target.value)
}

const TextInput = (props: Props) => (
    <input
        style={{
            width: '100%'
        }}
        type="text"
        name="text"
        onChange={onChangeHandler(props.handleChange)}
        value={props.value}
        placeholder={props.placeholder ? props.placeholder : ''}
    />
)

export default TextInput
