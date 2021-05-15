import { take } from './index'

export function takeOne<T>(collection: Iterable<T>): T | undefined {
    // eslint-disable-next-line no-magic-numbers
    return take(collection, 1)[0]
}
