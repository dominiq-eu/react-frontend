/*
    EmailInput.tsx
*/

import * as React from 'react'

type Props = {
    readonly value: string
    readonly handleChange: (value: string) => void
    readonly placeholder?: string
}

const validationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const validate = (email: string): boolean =>
    // The regex for validation is from here:
    // https://emailregex.com/index.html
    validationRegex.test(email.toLowerCase())

const EmailInput = (props: Props) => {
    const [isValid, setValid] = React.useState(false)
    const onChangeHandler = (fn: (string) => void) => event => {
        event.preventDefault()
        setValid(validate(event.target.value))
        fn(event.target.value)
    }
    return (
        <input
            style={{
                width: '100%',
                borderColor:
                    props.value == '' ? 'initial' : !isValid ? 'red' : 'green'
            }}
            type="email"
            name="email"
            onChange={onChangeHandler(props.handleChange)}
            placeholder={props.placeholder ? props.placeholder : ''}
        />
    )
}

export default EmailInput
