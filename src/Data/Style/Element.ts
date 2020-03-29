/*
    create

    Abstract css styles away to make them readable and consistent.
*/

import { Attribute } from './index'

const create = (style: Attribute) => ({
    centerX: () =>
        create({ ...style, alignItems: 'center', alignSelf: 'center' }),
    centerY: () =>
        create({
            ...style,
            marginTop: 'auto',
            marginBottom: 'auto',
            justifyItems: 'center',
            justifyContent: 'center'
        }),

    alignTop: () => create({ ...style, marginBottom: 'auto' }),
    alignBottom: () => create({ ...style, marginTop: 'auto' }),

    width: (size: number) => create({ ...style, width: size + 'px' }),
    height: (size: number) => create({ ...style, height: size + 'px' }),
    fillWidth: () => create({ ...style, width: '100%' }),
    fillHeight: () => create({ ...style, flexGrow: '100000' }),
    fullWidth: () => create({ ...style, width: '100vw' }),
    fullHeight: () => create({ ...style, height: '100vh' }),

    padding: (size: number) => create({ ...style, padding: size + 'px' }),
    paddingEach: (pad: {
        top: number
        bottom: number
        left: number
        right: number
    }) =>
        create({
            ...style,
            paddingTop: pad.top + 'px',
            paddingBottom: pad.bottom + 'px',
            paddingLeft: pad.left + 'px',
            paddingRight: pad.right + 'px'
        }),
    paddingXY: (pad: { x: number; y: number }) =>
        create({
            ...style,
            paddingTop: pad.y + 'px',
            paddingBottom: pad.y + 'px',
            paddingLeft: pad.x + 'px',
            paddingRight: pad.x + 'px'
        }),

    fgColor: (color: string) => create({ ...style, color }),
    bgColor: (backgroundColor: string) => create({ ...style, backgroundColor }),

    toCss: () => style
})

export const Element = create({})
export default Element
