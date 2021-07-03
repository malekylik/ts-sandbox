// Excercies 4
// lets say we have some function type
type SomeF = (a: number, b: string) => number
// and we have our utility type
type AppendArgument<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>;

type FinalF = AppendArgument<SomeF, boolean> 
// FinalF should be (x: boolean, a: number, b: string) => number
