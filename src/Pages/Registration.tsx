/*
    RegistrationPage

    FIXME: Refactor the RegistrationForm in it's own component.
    FIXME: Write Page data type
*/

import * as React from 'react'
import * as CSS from 'csstype'

// Data Types
import { Style, Element } from '../Data/Style'
import { Msg } from '../Data/State'
import * as Design from '../Data/Design'
import * as Password from '../Data/Password'
import * as Device from '../Data/Device'
import { update } from '../Data/App'

// Components
import { Row } from '../Components/Row'
import { Column } from '../Components/Column'
import { EmailInput } from '../Components/Input/Email'
import { PasswordInput } from '../Components/Input/Password'

const RegistrationEmailInput = ({ state }) => (
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
            style={Design.Widget.Input}
            placeholder="Email"
            value={state.email}
            required={true}
            handleChange={update(Msg.EmailEntered)}
        />
    </Column>
)

const RegistrationPasswordInput = ({ state }) => (
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
            style={Design.Widget.Input}
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
            type="submit"
            value="submit"
            style={Style(
                Element
                    //
                    .bgColor(Design.Color.DarkShade)
                    .fgColor(Design.Color.LightShade)
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

const RegistrationForm = ({ state }) => (
    <form
        style={Style([
            Element.fillWidth().paddingEach({
                top: 16,
                bottom: 32,
                left: 8,
                right: 8
            }),
            Design.Detail.Border
        ])}
        // action="#register"
    >
        {Device.responsive(
            {
                desktop: (
                    <Column>
                        <Row>
                            <RegistrationEmailInput state={state} />
                            <RegistrationPasswordInput state={state} />
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
                        <RegistrationPasswordInput state={state} />
                        <Column>
                            <RegistrationEmailInput state={state} />
                            <RegistrationSubmitButton />
                        </Column>
                    </Row>
                ),
                phone: (
                    <Column>
                        <RegistrationEmailInput state={state} />
                        <RegistrationPasswordInput state={state} />
                        <RegistrationSubmitButton />
                    </Column>
                )
            },
            state.device
        )}
    </form>
)

export const RegistrationPage = ({ state }) => (
    <div
        style={Style([
            Device.responsive(
                {
                    desktop: Element.centerXY().width(600),
                    tablet: Element.centerXY().width(600),
                    phone: Element.centerX()
                        .width(288)
                        .padding(16)
                },
                state.device
            )
        ])}
    >
        <RegistrationForm state={state} />
    </div>
)
