// Excercies 6
// type DeepFlat<T extends any[]> = {
//   [K in keyof T]: T[K] extends Array<any> ? DeepFlat<T[K]> : T[K]
// }[number]  // 🔥 here your code

type _DeepFlat<T extends any[]> = T extends [infer Head, ...infer Tail]
    ? Head extends any[]
        ? [..._DeepFlat<Head>, ..._DeepFlat<Tail>] // 🔥 here your code
        : [Head, ..._DeepFlat<Tail>]
    : T
type DeepFlat<T extends any[]> = _DeepFlat<T>[number]

// test case
type Naive = [['a'], ['b', 'c'], ['d']];
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type NaiveResult = DeepFlat<Naive>
type DeepResult = DeepFlat<Deep>
// should evaluate to "a" | "b" | "c" | "d" | "e"
