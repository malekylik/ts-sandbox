// Excercies 3
// function f(a: string | number, b: string | number) {
//     if (typeof a === 'string') {
//         return a + ':' + b; // no error but b can be number!
//     } else {
//         return a + b; // error as b can be number | string
//     }
// }

// function f<T extends string | number>(a: T, b: T): T {
//     if (typeof a === 'string') {
//         return a + ':' + b; // no error but b can be number!
//     } else {
//         return a + b; // error as b can be number | string
//     }
// }

// function f<T extends string | number, R extends (T extends string ? string : number)>(a: T, b: T): R {
//   if (typeof a === 'string') {
//     return a + ':' + b as R;
//   } else {
//     return ((a as number) + (b as number)) as R;
//   }
// }

function f(a: string, b: string): string;
function f(a: number, b: number): number;
function f(a: string | number, b: string | number ): string | number {
  if (typeof a === 'string') {
    return a + ':' + b;
  } else {
    return ((a as number) + (b as number));
  }
}


f(2, 3); // correct usage
f(1, 'a'); // should be error
f('a', 2); // should be error
f('a', 'b') // correct usage
