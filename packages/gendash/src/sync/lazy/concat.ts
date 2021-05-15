export function* concat<T>(...parts: Iterable<T>[]): Iterable<T> {
    for (const part of parts) {
        for (const e of part) {
            yield e
        }
    }
}
