// Excercies 1
type X = Promise<string>
type Y = Promise<{ field: number }>

type Transform<A extends Promise<any>> = A extends Promise<infer U> ? U : never;

type ResultX = Transform<X>; // ResultX type equals string
type ResultY = Transform<Y>; // ResultY type equals { field: number }
type ResultZ = Transform<number>; // ResultY type equals { field: number }
