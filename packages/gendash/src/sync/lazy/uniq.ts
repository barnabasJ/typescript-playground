export function* uniq<T>(collection: Iterable<T>): Iterable<T> {
    const seen = new Set<T>()
    for (const v of collection) {
        if (!seen.has(v)) {
            seen.add(v)
            yield v
        }
    }
}
