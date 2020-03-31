import * as React from 'react'

import { Style, Element } from '../Data/Style'
import * as Design from '../Data/Design'

//  Components  //
import { Column } from '../Components/Column'
import { RegistrationPage } from '../Pages/Registration'

//  View  //
export const MainPage = ({ state }) => (
    <Column style={Style(Element.fullHeight())}>
        <nav
            style={Style(
                Element.bgColor(Design.Color.DarkShade)
                    .fgColor(Design.Color.LightShade)
                    .fillWidth()
            )}
        >
            <div
                style={Style([
                    { fontSize: '24px' },
                    Element.height(59).centerXY()
                ])}
            >
                Registration
            </div>
        </nav>
        <main
            style={Style([
                { fontSize: '18px' },
                Element.fullWidth().fullHeight()
            ])}
        >
            <RegistrationPage state={state} />
        </main>
    </Column>
)
