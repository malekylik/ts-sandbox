type X  = {
  a: { g: number }
  b: number
}
type Y = {
  a: { h: string }
  b: string
  c: boolean
}

type MergeField<X, Y, K> = K extends keyof X
  ? K extends keyof Y
      ? (X[K] & Y[K]) extends never
          ? Y[K]
          : X[K] & Y[K]
      : X[K]
  : K extends keyof Y
      ? Y[K]
      : never;

type Merge<X, Y> = {
  [K in (keyof X | keyof Y)]: MergeField<X, Y, K>;
}

type XY = Merge<X,Y>
