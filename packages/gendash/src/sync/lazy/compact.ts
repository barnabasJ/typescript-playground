import { filter } from './filter'

export function compact<T>(
    collection: Iterable<T>
): Generator<T, void, unknown> {
    return filter(collection, (e) => Boolean(e))
}
