import * as React from 'react'

interface Props {
    readonly value: string
    readonly required: boolean
    readonly handleChange: (value: string) => void

    readonly placeholder?: string
    readonly disabled?: boolean
}

const onChangeHandler = (fn: (string) => void) => event => {
    event.preventDefault()
    fn(event.target.value)
}

export const TextInput = (props: Props) => (
    <input
        style={{
            width: '100%'
        }}
        type="text"
        name="text"
        onChange={onChangeHandler(props.handleChange)}
        value={props.value}
        placeholder={props.placeholder ? props.placeholder : ''}
        aria-required={props.required}
        aria-disabled={props.disabled}
        disabled={props.disabled}
    />
)
