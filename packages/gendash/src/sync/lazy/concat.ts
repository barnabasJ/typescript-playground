export function* concat<T>(
    ...parts: Iterable<T>[]
): Generator<T, void, unknown> {
    for (const part of parts) {
        for (const e of part) {
            yield e
        }
    }
}
