// Excercies 5
// Here types should remain the same ❄

type Config = {
  name: boolean;
  lastname: boolean;
};
type User5 = {
  name?: string;
  lastname?: string;
};

// declare function getUser<
//   C extends Config,
//   _NamePart = C['name'] extends true ? Pick<Required<User>, 'name'> : {},
//   _LastNamePart = C['lastname'] extends true ? Pick<Required<User>, 'lastname'> : {}
//   >(
//     config: C
// ): _NamePart & _LastNamePart;

// type Config = {
//   name: boolean;
//   lastname: boolean;
// };
// type User = {
//   name?: string;
//   lastname?: string;
// };

// declare function getUser(
//   config: { name: true; lastname: false}
// ): Pick<Required<User>,'name'>;

// declare function getUser(
//   config: { name: false; lastname: true}
// ): Pick<Required<User>,'lastname'>;

// declare function getUser(
//   config: { name: false; lastname: false}
// ): {};

// declare function getUser(
//   config: { name: true; lastname: true}
// ): Required<User>;


// Here declaration to be changed 🔥
declare function getUser<T extends Config, isName = T['name'] extends true ? true : false, isLastname = T['lastname'] extends true ? true : false>(
     config: T
): isName extends true
    ? isLastname extends true
      ? Required<User5>
      : Required<Omit<User5, 'lastname'>>
    : isLastname extends true
      ? Required<Omit<User5, 'name'>> 
      : Omit<User5, 'name' | 'lastname'>;

// test cases
const user = getUser({ name: true, lastname: false })
user.name // this field should be non-optional
user.lastname // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true })
user2.name // this field should be non-optional
user2.lastname // this field should be non-optional

const user3 = getUser({ name: false, lastname: true })
user3.name // this field should not be there and we should have compile error 🛑
user3.lastname // this field should be non-optional

const user4 = getUser({ name: false, lastname: false })
user4 // user4 should be empty object {}
