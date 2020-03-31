/*
    Style.ts

    Uniform flexbox styling that's easy for the developer

    Examples:
        import { Style, Border, Element } from './Style'
        <div
            style={
                Style([
                    { widthMax: '300px' },
                    Element
                        .paddingEach({
                            top: 32, bottom: 16, left: 8, right: 8
                        }),
                        .centerY()
                ])

            }>
            Hey you stylish type!
        </div>

    FIXME: Data type for helper (like ./Element.ts) for consistency and handling
*/

import * as CSS from 'csstype'

/*  Attribute

    Right now it's just a type alias, but maybe we need to extend it in the
    future. So we have it as type already and the compiler will help us when
    there need to be any changes.
*/
export type Attribute = Readonly<CSS.Properties>

/*  StyleHelper

    In typescript it's a common problem to mix index signature types with
    one exception: https://github.com/Microsoft/TypeScript/issues/14951
    This issue should be resolved with the nested index signature pattern:
    https://basarat.gitbook.io/typescript/type-system/index-signatures#typescript-index-signature

    But I don't want to model my types after a current shortcoming of
    typescript.
*/
export interface StyleHelper {
    [key: string]: (val?: NonNullable<any>) => StyleHelper | Attribute
    toCss: () => Attribute
}
const isStyleHelper = (object: NonNullable<any>): object is StyleHelper =>
    !!object.toCss
const toAttribute = (style: StyleHelper | Attribute): Attribute =>
    isStyleHelper(style) ? style.toCss() : style

/*  Basic styles we need for every component. This way we can guarantee a
    specific behaivor of the dom nodes, and that enables us to write Style
    Helper like the Element.ts module.
*/
const baseStyle: Readonly<Attribute> = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '0px',
    padding: '0px',
    marginTop: '0px',
    marginBottom: '0px',
    marginLeft: '0px',
    marginRight: '0px'
}

export const Style = (
    styles: Attribute | StyleHelper | (Attribute | StyleHelper)[]
): CSS.Properties => {
    const newStyle: Attribute = Array.isArray(styles)
        ? // Check if we got an array of styles, and then check if we got an
          // CSS.Properties object or if it's an helper (like ./Element.ts)
          // which is convertable to css (.toCss() function)
          (styles
              .map(toAttribute)
              .reduce(
                  (ret, curr) => Object.assign({}, ret, curr),
                  {}
              ) as Attribute) // Help typescript with the type inferring
        : toAttribute(styles)
    const ret: Attribute = Object.assign({}, baseStyle, newStyle)
    return ret
}
export { Border } from './Border'
export { Element } from './Element'
