import { filter } from './filter'

type ReturnType<T> = Iterable<Exclude<T, undefined | null | '' | false>>

export function compact<T>(collection: Iterable<T>): ReturnType<T> {
    return filter(collection, (e) => Boolean(e)) as ReturnType<T>
}
