export type MappingFunction<T> = (x: T) => T;

export interface DefiniteOneDimensionalIntegral<T = number> {
   f: MappingFunction<T>;
   a: T,
   b: T,
}
