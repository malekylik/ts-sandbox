// Excercies 7
// 7.1
type EmptyObject = Record<string, never>; // empty object only, 🔥 change the type to be exclusive for any field 

// test cases
const shouldPass: EmptyObject = {}; // this should be ok 🟢
const shouldFail: EmptyObject = {
    prop: 1 // here we should have compile error 🛑 
}

// 7.2
type ExcludeProps<ToComper extends Record<string, any>, Comper extends Record<string, any>> = {
  [K in keyof Comper]: K extends keyof ToComper ? Comper[K] : never;
}

type SomeType =  {
  prop: string
}
// change below function type definition 🔥 in order to allow only strict SomeType value
function takeSomeTypeOnly<T extends SomeType>(x: ExcludeProps<SomeType, T>) { return x }

// test cases
const x = { prop: 'a' };
takeSomeTypeOnly(x) // this should be ok 🟢

const y = { prop: 'a', addditionalProp: 'x' };
takeSomeTypeOnly(y) // here we should have compile error 🛑
