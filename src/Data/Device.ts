/*
    Device

    The type is representing a device. Right now it just checks for the
    width to classify which device we're on.

    Examples of how to work with the type:
        const device = Device.classify(window.innerWidth)
        if (Device.isDesktop(device)) {
            console.log("We are on a Desktop System")
        }

        const device = Device.classify(window.innerWidth)
        console.log("We are on a " +
            Device.responsive({
                desktop: "Desktop",
                tablet: "Tablet",
                phone: "Phone"
            }, device)
        )

        const device = Device.classify(window.innerWidth)
        Device.caseOf(device)
              .desktop(() => console.log("On a Desktop"))
              .tablet(() => console.log("On a Tablet"))
              .phone(() => console.log("On a Phone"))

    Fixme: Make the breakpoints configurable from outside of the class.
*/

//  Breakpoints  //

enum Breakpoint {
    Phone, // No breakpoint. Everything below tablet is phone.
    Tablet = 768,
    Desktop = 1024
}

//  Type Definition //

interface Phone {
    readonly _type: 'PhoneDeviceType'
}
interface Tablet {
    readonly _type: 'TabletDeviceType'
}
interface Desktop {
    readonly _type: 'DesktopDeviceType'
}

export type Device = Phone | Tablet | Desktop

//  Type Constructors  //

export const classify = (windowWidth: number): Device => {
    if (windowWidth >= Breakpoint.Desktop) {
        return { _type: 'DesktopDeviceType' }
    } else if (windowWidth >= Breakpoint.Tablet) {
        return { _type: 'TabletDeviceType' }
    } else {
        return { _type: 'PhoneDeviceType' }
    }
}

//  Type pattern matching  //

interface CaseOfType<T> {
    readonly phone: (fn: () => void) => CaseOfType<T>
    readonly tablet: (fn: () => void) => CaseOfType<T>
    readonly desktop: (fn: () => void) => CaseOfType<T>
}
export const caseOf = <T>(device: Device): CaseOfType<T> => ({
    phone: fn => {
        if (isPhone(device)) {
            fn()
        }
        return caseOf(device)
    },
    tablet: fn => {
        if (isTablet(device)) {
            fn()
        }
        return caseOf(device)
    },
    desktop: fn => {
        if (isDesktop(device)) {
            fn()
        }
        return caseOf(device)
    }
})

//  Type Helper  //

interface ResponsiveType<T> {
    readonly phone: T
    readonly tablet: T
    readonly desktop: T
}
export const responsive = <T>(val: ResponsiveType<T>, device: Device): T => {
    if (isDesktop(device)) {
        return val.desktop
    } else if (isTablet(device)) {
        return val.tablet
    } else {
        return val.phone
    }
}

//  Type guards  //

export const isPhone = (device: Device): device is Phone =>
    device._type === 'PhoneDeviceType'

export const isTablet = (device: Device): device is Tablet =>
    device._type === 'TabletDeviceType'

export const isDesktop = (device: Device): device is Desktop =>
    device._type === 'DesktopDeviceType'
