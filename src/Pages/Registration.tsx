/*
    RegistrationPage
*/

import * as React from 'react'
import * as CSS from 'csstype'

// Data Types
import { Style, Element, Border } from '../Data/Style'
import { Msg } from '../Data/State'
import * as Password from '../Data/Password'
import * as Device from '../Data/Device'

// Components
import Row from '../Components/Row'
import Column from '../Components/Column'
import EmailInput from '../Components/Input/Email'
import PasswordInput from '../Components/Input/Password'

const RegistrationEmailInput = ({ state, update }) => (
    <Column
        style={Style(
            Element.paddingEach({
                top: 16,
                bottom: 0,
                left: 8,
                right: 8
            })
        )}
    >
        <div style={Style({ paddingBottom: '16px' })}>Email</div>
        <EmailInput
            style={Style([
                Element.height(52).padding(16),
                Border.solid()
                    .width(2)
                    .color('black')
            ])}
            placeholder="Email"
            value={state.email}
            required={true}
            handleChange={update(Msg.EmailEntered)}
        />
    </Column>
)

const RegistrationPasswordInput = ({ state, update }) => (
    <Column
        style={Style(
            Element.paddingEach({
                top: 16,
                bottom: 0,
                left: 8,
                right: 8
            })
        )}
    >
        <div style={Style({ paddingBottom: '16px' })}>Password</div>
        <PasswordInput
            style={Style([
                Element.height(52).padding(16),
                Border.solid()
                    .width(2)
                    .color('black')
            ])}
            placeholder="Password"
            password={state.password}
            required={true}
            handleChange={update(Msg.PasswordEntered)}
        />
        <aside>
            <Column style={Style([{ paddingTop: '13px' }])}>
                <div>
                    {!Password.isNone(state.password) &&
                    state.password.isLongerThan(8)
                        ? '✔ '
                        : '✘ '}
                    8+ characters
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasLowercaseChar()
                        ? '✔ '
                        : '✘ '}
                    lowercase letter
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasUppercaseChar()
                        ? '✔ '
                        : '✘ '}
                    uppercase letter
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasDecimalChar()
                        ? '✔ '
                        : '✘ '}
                    number
                </div>

                <div>
                    {!Password.isNone(state.password) &&
                    state.password.hasSpecialChar()
                        ? '✔ '
                        : '✘ '}
                    special character
                </div>
            </Column>
        </aside>
    </Column>
)

const RegistrationSubmitButton = ({ style }: { style?: CSS.Properties }) => (
    <Column
        style={Style([
            Element
                //
                .paddingEach({
                    top: 32,
                    bottom: 0,
                    left: 8,
                    right: 8
                })
                .alignBottom(),
            style ? style : {}
        ])}
    >
        <button
            style={Style(
                Element
                    //
                    .fgColor('white')
                    .bgColor('black')
                    //
                    .fillWidth()
                    .height(52)
                    .centerX()
                    .centerY()
            )}
        >
            Submit
        </button>
    </Column>
)

const RegistrationForm = ({ state, update }) => (
    <form
        style={Style([
            Element.fillWidth().paddingEach({
                top: 16,
                bottom: 32,
                left: 8,
                right: 8
            }),
            Border.solid()
                .width(2)
                .color('black')
        ])}
    >
        {Device.responsive(
            {
                desktop: (
                    <Column>
                        <Row>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationPasswordInput
                                state={state}
                                update={update}
                            />
                        </Row>
                        <Row reverse={true}>
                            <RegistrationSubmitButton
                                style={{
                                    width: '50%',
                                    maxWidth: '50%'
                                }}
                            />
                        </Row>
                    </Column>
                ),
                tablet: (
                    <Row>
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <Column>
                            <RegistrationEmailInput
                                state={state}
                                update={update}
                            />
                            <RegistrationSubmitButton />
                        </Column>
                    </Row>
                ),
                phone: (
                    <Column>
                        <RegistrationEmailInput state={state} update={update} />
                        <RegistrationPasswordInput
                            state={state}
                            update={update}
                        />
                        <RegistrationSubmitButton />
                    </Column>
                )
            },
            state.device
        )}
    </form>
)

export const RegistrationPage = ({ state, update }) => (
    <div
        style={Style([
            Element.centerX()
                .centerY()
                .width(
                    Device.responsive(
                        { desktop: 600, tablet: 600, phone: 288 },
                        state.device
                    )
                )
        ])}
    >
        <RegistrationForm state={state} update={update} />
    </div>
)

export default RegistrationPage
