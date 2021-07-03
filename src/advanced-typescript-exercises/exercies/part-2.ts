// Excercies 2
type User = {
  id: number;
  kind: string;
};

function makeCustomer<T extends User>(u: T): T {
  // Below error, why?
  return {
      ...u,
      id: u.id,
      kind: 'customer'
  }
}
