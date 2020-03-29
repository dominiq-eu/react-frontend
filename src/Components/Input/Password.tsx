/*
    Password.tsx

    This is a password input box. By using the password type (Data/Password.ts)
    we can avoid of specifically knowing it and storing the value in our state
    and therefore directly referenced in memory.
*/
import * as React from 'react'
import * as CSS from 'csstype'
import * as Password from '../../Data/Password'

//
//  Validation
//
enum ValidationState {
    Initial = 'initial',
    Valid = 'green',
    Invalid = 'red'
}

const getValidationStateColor = (pass: Password.Password): ValidationState => {
    if (Password.isNone(pass)) {
        return ValidationState.Initial
    } else {
        return Password.isValid(pass)
            ? ValidationState.Valid
            : ValidationState.Invalid
    }
}

//
//  Component
//
interface Props {
    readonly password: Password.Password
    readonly required: boolean
    readonly handleChange: (value: Password.Password) => void

    readonly placeholder?: string
    readonly disabled?: boolean
    readonly style?: CSS.Properties
}

export const PasswordInput = (props: Props) => {
    const onChangeHandler = fn => event => {
        event.preventDefault()
        fn(Password.create(event.target.value))
    }
    return (
        <input
            style={Object.assign({}, props.style ? props.style : {}, {
                width: '100%',
                borderColor: getValidationStateColor(props.password)
            })}
            type="password"
            name="password"
            autoComplete="password"
            // value={Password.isNone(props.password) ? '' : undefined}
            onChange={onChangeHandler(props.handleChange)}
            placeholder={props.placeholder ? props.placeholder : ''}
            aria-required={props.required}
            aria-disabled={props.disabled}
            disabled={props.disabled}
        />
    )
}
