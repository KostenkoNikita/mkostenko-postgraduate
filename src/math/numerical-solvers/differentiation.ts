import { EPS } from "../defaults";
import { MappingFunction } from "../types";

export function firstDerivative(f: MappingFunction<number>, x: number, h: number = EPS): number {
   const doubleStep = h * 2;
   const denominator = 12 * h;
   const nominator = f(x - doubleStep) - 8*f(x - h) + 8*f(x + h) - f(x + doubleStep);
   return nominator / denominator;
}
