import * as React from 'react'

type Props = {
    readonly placeholder?: string
    readonly handleHash: (value: string) => string
    readonly handleChange: (value: string) => void
}

enum ValidationState {
    Initial = 'initial',
    Valid = 'green',
    Invalid = 'red'
}
const validate = (password: string): ValidationState => {
    if (password == '') {
        return ValidationState.Initial
    } else if (password.length >= 8) {
        return ValidationState.Valid
    }
    return ValidationState.Invalid
}

const PasswordInput = (props: Props) => {
    const [validationState, setValid] = React.useState(ValidationState.Initial)
    const onChangeHandler = (
        hash: (string) => string,
        fn: (string) => void
    ) => event => {
        event.preventDefault()
        setValid(validate(event.target.value))
        fn(hash(event.target.value))
    }
    return (
        <input
            style={{
                width: '100%',
                borderColor: validationState
            }}
            type="password"
            name="password"
            onChange={onChangeHandler(props.handleHash, props.handleChange)}
            placeholder={props.placeholder ? props.placeholder : ''}
        />
    )
}

export default PasswordInput
