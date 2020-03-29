/*
    Password

    A password type. You can't get the password out of the type, it's protected
    with a closure. Nonetheless we can ask the type about some of the
    properties of the password and, for later referncing and securly storing in
    the backend, get a sha1 hash.

    Example Code:
        import * as Password from "./Data/Password"
        const p = Password.create('password1234')
        Password.caseOf(p)
                .password(p => console.log("Password Hash:", p.getSha1Hash()))
                .none(() => console.log("No password set"))
        if (Password.isNone(p)) {
            console.log("Enter a password")
        }
        else if (Password.isPassword(p) && Password.isValid(p)) {
            console.log("You entered a strong password")
        }
*/

import Sha1 from 'js-sha1'

//  Type Definition  //

interface PasswordType {
    readonly _type: 'PasswordType'
    readonly isLongerThan: (number) => boolean
    readonly hasLowercaseChar: () => boolean
    readonly hasUppercaseChar: () => boolean
    readonly hasDecimalChar: () => boolean
    readonly hasSpecialChar: () => boolean
    readonly getSha1Hash: () => string
}
interface None {
    readonly _type: 'NoPasswordType'
}

export type Password = PasswordType | None

//  Constructors  //

export const create = (pass: string): PasswordType => ({
    _type: 'PasswordType',
    isLongerThan: num => pass.length > num,
    hasLowercaseChar: () => /[a-z]/.test(pass),
    hasUppercaseChar: () => /[A-Z]/.test(pass),
    hasDecimalChar: () => /[0-9]/.test(pass),
    hasSpecialChar: () => /[~@#$%^&*+=`|{}:;!.?\"()\[\]-]/.test(pass),
    getSha1Hash: () => Sha1(pass)
})

export const none: None = {
    _type: 'NoPasswordType'
}

//  Utilities  //

export const isValid = (pass: Password): boolean =>
    isPassword(pass) &&
    pass.isLongerThan(8) &&
    pass.hasLowercaseChar() &&
    pass.hasUppercaseChar() &&
    pass.hasDecimalChar() &&
    pass.hasSpecialChar()

export const isEqual = (pass1: Password, pass2: Password): boolean =>
    (isNone(pass1) && isNone(pass2)) ||
    (isPassword(pass1) &&
        isPassword(pass2) &&
        pass1.getSha1Hash() === pass2.getSha1Hash())

//  Pattern matching  //

interface CaseOfType {
    readonly password: (fn: (p: Password) => void) => CaseOfType
    readonly none: (fn: () => void) => CaseOfType
}
export const caseOf = (pass: Password): CaseOfType => ({
    password: fn => {
        if (isPassword(pass)) {
            fn(pass)
        }
        return caseOf(pass)
    },
    none: fn => {
        if (isNone(pass)) {
            fn()
        }
        return caseOf(pass)
    }
})

//  Type Guards  //

export const isPassword = (pass: Password): pass is PasswordType =>
    pass._type === 'PasswordType'

export const isNone = (pass: Password): pass is None =>
    pass._type === 'NoPasswordType'
