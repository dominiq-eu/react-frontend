/*
    Border

    Abstract css styles away to make them readable and consistent.
*/

import Attribute from './Attribute'

const create = (style: Attribute) => ({
    solid: () => create({ ...style, borderStyle: 'solid' }),
    dashed: () => create({ ...style, borderStyle: 'dashed' }),
    double: () => create({ ...style, borderStyle: 'double' }),
    groove: () => create({ ...style, borderStyle: 'groove' }),
    hidden: () => create({ ...style, borderStyle: 'hidden' }),

    width: (size: number) => create({ ...style, borderWidth: size + 'px' }),
    color: (borderColor: string) => create({ ...style, borderColor }),

    toCss: () => style
})

export const Border = create({})
export default Border
