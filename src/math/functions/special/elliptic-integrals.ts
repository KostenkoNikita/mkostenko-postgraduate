import { EPS } from "../../defaults";
import { factorial } from "../factorial";
import { PI_DIV_2 } from "../../constants";

function getSequenceMultiplier(n: number): number {
   const doubledN = 2 * n;
   const base = factorial(doubledN) / (Math.pow(2, doubledN) * Math.pow(factorial(n), 2));
   return Math.pow(base, 2);
}

export function fullFirstKindEllipticIntegral(k: number, precision: number = EPS) {
   let sequenceSum = 0;
   let n = 0;
   let sequenceTerm = Number.NEGATIVE_INFINITY;
   let prevSequenceTerm = Number.NEGATIVE_INFINITY;
   do {
      prevSequenceTerm = sequenceTerm;
      
      const doubledN = 2 * n;
      sequenceTerm = getSequenceMultiplier(n) * Math.pow(k, doubledN);
      sequenceSum += sequenceTerm;
      
      if(isNaN(sequenceTerm)) {
         console.log(n);
         console.log(doubledN);
         console.log(factorial(doubledN));
         console.log(Math.pow(2, doubledN) * Math.pow(factorial(n), 2));
      }
      
      n++;
   } while(Math.abs(sequenceTerm - prevSequenceTerm) > precision);
   
   return sequenceSum * PI_DIV_2;
}

export function fullSecondKindEllipticIntegral(k: number, precision: number = EPS) {
   let sequenceSum = 0;
   let n = 0;
   let sequenceTerm = Number.NEGATIVE_INFINITY;
   let prevSequenceTerm = Number.NEGATIVE_INFINITY;
   do {
      prevSequenceTerm = sequenceTerm;
      
      const doubledN = 2 * n;
      sequenceTerm = getSequenceMultiplier(n) * Math.pow(k, doubledN) / (1 - doubledN);
      sequenceSum += sequenceTerm;
      
      n++;
   } while(Math.abs(sequenceTerm - prevSequenceTerm) > precision);
   
   return sequenceSum * PI_DIV_2;
}
