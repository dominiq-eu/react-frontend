/*
    Attribute

    Right now it's just a type alias, but maybe we need to extend it in the
    future. So we have it as type already and the compiler will help us when
    there need to be any changes.
*/

import * as CSS from 'csstype'

export type Attribute = Readonly<CSS.Properties>
export default Attribute
