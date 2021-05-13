import { filter } from './filter'

export function uniqBy<T>(collection: Iterable<T>, identifier: (e: T) => any) {
    const seen = new Set()
    return filter(collection, (e) => {
        const id = identifier(e)
        if (seen.has(id)) {
            return false
        }
        seen.add(id)
        return true
    })
}
