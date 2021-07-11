type Count<A, _C extends Array<0> = []> = A extends _C['length'] ? _C : Count<A, [0, ..._C]>;

type Inc<A> = [...Count<A>, 0]['length'];
type Dec<A> = Count<A> extends [any, ...infer Tail]
    ? Tail['length']
    : 0

type Add<A, B> = [...Count<A>, ...Count<B>]['length'];
type Sub<A, B> = B extends 0 ? A : Sub<Dec<A>, Dec<B>>;

type Mul<A, B, R = 0> = B extends 0 ? R : Mul<A, Dec<B>, Add<R, A>>;

type DecBin = [128, 64, 32, 16, 8, 4, 2, 1];

// type _ToDec<T extends Int8> = {
//   [K in keyof T]: T[K] extends OneBit ? K extends keyof DecBin ? DecBin[K] : 0 : 0;
// };
// type ToDec<
//   T extends Int8,
//   _I extends Int8 = _ToDec<T>,

//   _Res7 = Add<_I[7], _I[6]>,
//   _Res6 = Add<_Res7, _I[5]>,
//   _Res5 = Add<_Res6, _I[4]>,
//   _Res4 = Add<_Res5, _I[3]>,
//   _Res3 = Add<_Res4, _I[2]>,
//   _Res2 = Add<_Res3, _I[1]>,
//   _Res1 = Add<_Res2, _I[0]>,
// > = _Res1;

type ToDec<
  T extends Int8,

  _Res7 extends Array<0> = T[7] extends ZeroBit ? [] : [0],
  _Res6 extends Array<0> = T[6] extends ZeroBit ? _Res7 : [..._Res7, 0, 0],
  _Res5 extends Array<0> = T[5] extends ZeroBit ? _Res6 : [..._Res6,  0, 0, 0, 0],
  _Res4 extends Array<0> = T[4] extends ZeroBit ? _Res5 : [..._Res5,  0, 0, 0, 0,   0, 0, 0, 0],
  _Res3 extends Array<0> = T[3] extends ZeroBit ? _Res4 : [..._Res4,  0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  _Res2 extends Array<0> = T[2] extends ZeroBit ? _Res3 : [..._Res3,  0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  _Res1 extends Array<0> = T[1] extends ZeroBit ? _Res2 : [..._Res2,  0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
  _Res0 extends Array<0> = T[0] extends ZeroBit ? _Res1 : [..._Res1,  0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0,   0, 0, 0, 0],
> = _Res0['length'];

type ZeroBit = 0;
type OneBit = 1;
type Bit = ZeroBit | OneBit;
type Int8 = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit ];

type Not<T extends Int8> = {
  [K in keyof T]: T[K] extends ZeroBit ? OneBit : ZeroBit;
};

type AndBit<A extends Bit, B extends Bit> = A extends OneBit
  ? B extends OneBit
    ? OneBit
    : ZeroBit
  : ZeroBit;

type OrBit<A extends Bit, B extends Bit> = A extends ZeroBit
  ? B extends ZeroBit
    ? ZeroBit
    : OneBit
  : OneBit;

type XorBit<A extends Bit, B extends Bit> = A extends OneBit
  ? B extends OneBit
    ? ZeroBit
    : OneBit
  : B extends OneBit
    ? A extends OneBit
      ? ZeroBit
      : OneBit
    : ZeroBit;

type SumBit<T extends Bit, TT extends Bit> = XorBit<T, TT>;
type CarrySum<T extends Bit, TT extends Bit> = AndBit<T, TT>;

type And<T extends Int8, TT extends Int8> 
  = [AndBit<T[0], TT[0]>, AndBit<T[1], TT[1]>, AndBit<T[2], TT[2]>, AndBit<T[3], TT[3]>, AndBit<T[4], TT[4]>, AndBit<T[5], TT[5]>, AndBit<T[6], TT[6]>, AndBit<T[7], TT[7]>];

type NAnd<T extends Int8, TT extends Int8> = Not<And<T, TT>>;

type Sum<
  T extends Int8,
  TT extends Int8,

    _Sum7 extends Bit = SumBit<T[7], TT[7]>,
  _Carry7 extends Bit = OrBit<T[7], TT[7]>,

    _Sum6 extends Bit = SumBit<_Carry7, SumBit<T[6], TT[6]>>,
  _Carry6 extends Bit = OrBit<CarrySum<_Carry7, SumBit<T[6], TT[6]>>, CarrySum<T[6], TT[6]>>,

    _Sum5 extends Bit = SumBit<_Carry6, SumBit<T[5], TT[5]>>,
  _Carry5 extends Bit = OrBit<CarrySum<_Carry6, SumBit<T[5], TT[5]>>, CarrySum<T[5], TT[5]>>,

    _Sum4 extends Bit = SumBit<_Carry5, SumBit<T[4], TT[4]>>,
  _Carry4 extends Bit = OrBit<CarrySum<_Carry5, SumBit<T[4], TT[4]>>, CarrySum<T[4], TT[4]>>,

    _Sum3 extends Bit = SumBit<_Carry4, SumBit<T[3], TT[3]>>,
  _Carry3 extends Bit = OrBit<CarrySum<_Carry4, SumBit<T[3], TT[3]>>, CarrySum<T[3], TT[3]>>,

    _Sum2 extends Bit = SumBit<_Carry3, SumBit<T[2], TT[2]>>,
  _Carry2 extends Bit = OrBit<CarrySum<_Carry3, SumBit<T[2], TT[2]>>, CarrySum<T[2], TT[2]>>,

    _Sum1 extends Bit = SumBit<_Carry2, SumBit<T[1], TT[1]>>,
  _Carry1 extends Bit = OrBit<CarrySum<_Carry2, SumBit<T[1], TT[1]>>, CarrySum<T[1], TT[1]>>,

    _Sum0 extends Bit = SumBit<_Carry1, SumBit<T[0], TT[0]>>,
  _Carry0 extends Bit = OrBit<CarrySum<_Carry1, SumBit<T[0], TT[0]>>, CarrySum<T[0], TT[0]>>,
> 
  = [[_Sum0, _Sum1, _Sum2, _Sum3, _Sum4, _Sum5, _Sum6, _Sum7], _Carry0];


type A = [1, 1, 1, 1, 0, 1, 1, 1];
type B = [0, 0, 0, 0, 0, 0, 1, 1];
type ADec = ToDec<A>;
type BDec = ToDec<B>;
type SumRes = Sum<A, B>;
type DecRes = ToDec<SumRes[0]>;
