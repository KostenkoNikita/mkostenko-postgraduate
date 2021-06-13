import { DefiniteOneDimensionalIntegral } from "../types";
import { EPS } from "../defaults";

export function solveSimpson(integral: DefiniteOneDimensionalIntegral, h = EPS): number {
   const {
      f,
      a,
      b,
   } = integral;
   
   const rangeLength = b - a;
   
   let numberOfSegments = Math.ceil(rangeLength / h);
   if(numberOfSegments % 2 === 1) {
      ++numberOfSegments;
   }
   
   const step = rangeLength / numberOfSegments;
   
   let sequenceSum = 0;
   
   for(let k = 1; k < numberOfSegments; k += 2) {
      const xCurrPoint = a + k * step;
      const xPrevPoint = xCurrPoint - step;
      const xNextPoint = xCurrPoint + step;
   
      sequenceSum += f(xPrevPoint) + 4 * f(xCurrPoint) + f(xNextPoint);
   }
   
   return step * sequenceSum / 3.0;
}
