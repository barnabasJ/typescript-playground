export function merge<TObject, TSource>(
    object: TObject,
    source: TSource
): TObject & TSource
export function merge<TObject, TSource1, TSource2>(
    object: TObject,
    source1: TSource1,
    source2: TSource2
): TObject & TSource1 & TSource2
export function merge(object: any, ...source: any): any
export function merge(object: any, ...sources: any[]) {
    for (const source of sources) {
        for (const key in source) {
            object[key] = source[key]
        }
    }
    return object
}
