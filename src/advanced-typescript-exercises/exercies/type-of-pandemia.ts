// removes element on the beginning of the tuple
type Shift<T extends Array<any>> = ((...a: T) => any) extends ((a: any, ...result: infer Result) => any) ? Result : never;
// adds element on the beginning of the tuple
type Unshift<A, T extends Array<any>> = ((a: A, ...b: T) => any) extends ((...result: infer Result) => any) ? Result : never;

type Case<ValueToCheck, ReturnValue> = { return: ReturnValue; check: ValueToCheck };
type CaseCheck<CaseValue> = CaseValue extends Case<any, any> ? CaseValue['check'] : never;
type CaseReturn<CaseValue> = CaseValue extends Case<any, any> ? CaseValue['return'] : never;

type Switch<Conditions extends Array<Case<any, any>>, ValueToCheck> = {
  [K in keyof Conditions]: ValueToCheck extends CaseCheck<Conditions[K]> ? CaseReturn<Conditions[K]> : never;
}[Extract<keyof Conditions, number>];

type Sick = {state: 'sick'}
type Healthy = {state: 'healthy'}
type Quarantine = {state: 'quarantaine'}

type Patient = {
  name: string
} & (Sick | Healthy | Quarantine);

type John = {name: 'John'} & Sick
type Tom = {name: 'Tom'} & Healthy
type Kate = {name: 'Kate'} & Sick
type Mike = {name: 'Mike'} & Quarantine
type Paul = {name: 'Paul'} & Healthy
type Doroty = {name: 'Doroty'} & Quarantine
type Gregory = {name: 'Gregory'} & Sick
type Pierce = {name: 'Pierce'} & Quarantine


type CanMeet<A extends Patient, B extends Patient> = Switch<[
    Case<[Healthy['state'], Healthy['state']]       | [Sick['state'], Sick['state']],       true>,
    Case<[Sick['state'], Healthy['state']]          | [Healthy['state'], Sick['state']],    false>,
    Case<[Quarantine['state'], Quarantine['state']  | Healthy['state'] | Sick['state']],    false>,
    Case<[Quarantine['state'] | Healthy['state']    | Sick['state'], Quarantine['state']],  false>,
  ], [A['state'], B['state']]>;

type JohnWithTom = CanMeet<John, Tom> // false as one is sick and anothe is not
type JohnWithKate = CanMeet<John, Kate> // true as both are sick
type DorotyWithGregory = CanMeet<Doroty, Gregory> // false as people in quarantaine cannot meet anybody
type MikeWithTom = CanMeet<Mike, Tom> // false as people in quarantaine cannot meet anybody
type PaulWithTom = CanMeet<Paul, Tom> // true yes both are healty

type Get<Patients extends Patient[], Health extends (Sick | Healthy | Quarantine)> = Patients extends [infer Patient, ...infer R]
  ? Patient extends Health
    ? [Patient, ...Get<Shift<Patients>, Health>]
    : [...Get<Shift<Patients>, Health>]
  : [];

type GetSick<Patients extends Patient[]> = Get<Patients, Sick>;

type Check1 = GetSick<[
  John,
  Tom,
  Kate,
]> // Check1 should be [John, Kate]
type Check2 = GetSick<[
  Gregory,
  Pierce,
  Kate,
  Paul
]> // Check2 should be [Kate, Gregory]
type Check3 = GetSick<[
  Tom,
  Paul
]> // Check3 should be []

type WrapArr<Arr extends any, > = {
  [K in keyof Arr]: [Arr[K]]
}

type CanAccomodate<Beds extends '🛌'[], Patients extends Patient[]> = Beds['length'] extends Patients['length'] ? true : false;

type Result1 = CanAccomodate<['🛌', '🛌'], [John, Tom]> // true, we have the same amount of beds
type Result2 = CanAccomodate<['🛌', '🛌'], [John]>  // true, we have more beds
type Result3 = CanAccomodate<[], [John]>  // false, we have no beds
type Result4 = CanAccomodate<['🛌', '🛌'], [John, Tom, Doroty]>  // false, we have less beds than patients


type Segragate<Patients extends Patient[]> = {
  'sick': GetSick<Patients>;
  'quarantine': WrapArr<Get<Patients, Quarantine>>;
  'healthy': Get<Patients, Healthy>;
}

// Check the result:
type AfterSegregation = Segragate<[
  John,
  Tom,
  Kate,
  Mike,
  Paul,
  Doroty,
]>
/**
 AferSegregation should be
 {
    sick: [Kate, John];
    quarantine: [[Doroty], [Mike]];
    healty: [Paul, Tom];
 }
 */
