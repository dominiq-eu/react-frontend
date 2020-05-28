/*
    Stream

    Data type representing a stream of values. You can subscribe to value
    changes.

    // FIXME: Cleanup
    FIXME: Implement .map()
    FIXME: Implement .reduce()
    FIXME: Implement .filter()
*/

// Make configurable in constructor funciton
const StreamMaxLength = 5

export const Stream = (val: NonNullable<any>) => {
    // The values are stored in an array, right now this wouldn't be
    // necessary. We only need it for future expadability, if we
    // implement functions like .take() or .replay(). Also, per definition,
    // a stream is a series of values and an array represents a series.
    const values = []
    const subscriber = new Set([])
    return {
        value: () => values[0],
        subscribe: (f: (val: NonNullable<any>) => void) => subscriber.add(f),
        update: (val: NonNullable<any>) => {
            values.unshift(val)
            subscriber.forEach(f => f(values[0]))
            return values[0]
        }
    }
}
