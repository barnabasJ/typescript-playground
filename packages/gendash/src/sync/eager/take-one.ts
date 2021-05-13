import { take } from './index'

export function takeOne<T>(collection: Iterable<T>): T | undefined {
    return take(collection, 1)[0]
}
