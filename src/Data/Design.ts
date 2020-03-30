/*
    Design

    The app design in generalizable constants.
*/

import { Style, Element, Border } from './Style'

/*  Color

    From: http://colormind.io/bootstrap/
    "
    Light shades
    Use this color as the background for your dark-on-light designs, or the text color of an inverted design.

    Light accent
    Accent colors can be used to bring attention to design elements by contrasting with the rest of the palette.

    Main brand color
    This color should be eye-catching but not harsh. It can be liberally applied to your layout as its main identity.

    Dark accent
    Another accent color to consider. Not all colors have to be used - sometimes a simple color scheme works best.

    Dark shades
    Use as the text color for dark-on-light designs, or as the background for inverted designs.
    "
*/
export const Color = {
    MainBrand: 'black',

    LightShade: 'white',
    LigthAccent: 'white',

    DarkShade: 'black',
    DarkAccent: 'black'
}

export const Font = {
    Normal: { fontSize: '18px' },
    Headline: { fontSize: '24px' }
}

export const Detail = {
    Border: Border.solid()
        .color(Color.DarkShade)
        .width(2),
    Padding: Element.paddingEach({
        top: 16,
        bottom: 16,
        left: 8,
        right: 8
    })
}

const InputHeight = 52

export const Element = {
    NavBar: Element.bgColor(Color.MainBrand)
        .fgColor(Color.LightShade)
        .height(59),
    Input: Style([Element.height(InputHeight).padding(16), Detail.Border]),
    Button: Element.bgColor(Color.DarkShade)
        .fgColor(Color.LightShade)
        .height(InputHeight)
        .centerXY()
}

export const Layout = {}
