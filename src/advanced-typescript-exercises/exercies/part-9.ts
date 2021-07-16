type NonEmptyArray<T> = [T, ...T[]]
// type NonEmptyArray<T> = T[] & { 0: T };
const a: NonEmptyArray<string> = [] // should be compilation error 🛑
const b: NonEmptyArray<string> = ['Hi TS'] // should be ok! 👌
