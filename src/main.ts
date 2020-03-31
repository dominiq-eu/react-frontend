/*
    main.ts
*/

import { Msg, init } from './Data/State'
import { App, update } from './Data/App'
import { getCurrentWindowWidth } from './Helper'

import { MainPage } from './Pages/Main'

//  Effects  //

const updateWindowWidthEffect = () => {
    // Register resize event and debounce the state update a little bit, to
    // prevent too many events, too fast state updates and too fast re-renders.
    let timeoutId = null
    const resizeListener = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(
            () => update(Msg.WindowResized)(getCurrentWindowWidth()),
            35 // Wait for 2 frames (1 frame appox 17ms at 60Hz)
        )
        // update(Msg.WindowResized)(getCurrentWindowWidth())
    }
    window.addEventListener('resize', resizeListener)
    return () => {
        window.removeEventListener('resize', resizeListener)
    }
}

//  App  //

App({
    init: init,
    view: state => MainPage({ state }),
    effects: [updateWindowWidthEffect],
    node: document.body
})
