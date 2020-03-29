/*
    Style.ts

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
*/

import * as CSS from 'csstype'
import Attribute from './Attribute'

import Element from './Element'
export { Element } from './Element'
import Border from './Border'
export { Border } from './Border'

// Base styles we need for every component
const baseStyle: Attribute = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    border: '0px',
    padding: '0px',
    margin: '0px'
}

// interface Style {
//     with: (
//         attr:
//             | Attribute
//             | { toCss: () => Attribute }
//             | (Attribute | { toCss: () => Attribute })[]
//     ) => Style
//     toCss: () => CSS.Properties
// }
// const create = (s: Attribute): Style => ({
//     with: attr => {
//         if ('toCss' in attr) {
//             return create({ ...s, ...attr.toCss() })
//         } else if (Array.isArray(attr)) {
//             return create(
//                 attr.reduce(
//                     (ret, curr) =>
//                         Object.assign(
//                             {},
//                             ret,
//                             'toCss' in curr ? curr.toCss() : curr
//                         ),
//                     s
//                 ) as Attribute
//             )
//         } else {
//             return create({ ...s, ...attr })
//         }
//     },
//     toCss: () => s
// })
// export const Style = create(baseStyle)

export const Style = (
    styles:
        | Attribute
        | { toCss: () => Attribute }
        | (Attribute | { toCss: () => Attribute })[]
): CSS.Properties => {
    const newStyle = Array.isArray(styles)
        ? styles.reduce(
              (ret, curr) =>
                  Object.assign({}, ret, 'toCss' in curr ? curr.toCss() : curr),
              {}
          )
        : 'toCss' in styles
        ? styles.toCss()
        : styles
    return Object.assign({}, baseStyle, newStyle)
}
export default { Style, Element, Border }
