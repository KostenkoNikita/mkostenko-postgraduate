import { ICrackShape } from "../shape";
import { IsotropicMaterial } from "../material";
import { TwoCracksBetweenHomogeneousMaterials } from "../cracks";
import { writeResultsMapToXslx } from "./xlsx-writer";

/**
 * @deprecated
 */
export function performCalculations() {
   const c = 1;
   const d = 2;
   const a = -d;
   const b = -c;
   const leftCrackShape: ICrackShape = {
      xEdgeLeft: a,
      xEdgeRight: b,
   };
   const rightCrackShape: ICrackShape = {
      xEdgeLeft: c,
      xEdgeRight: d,
   };
   
   const material = IsotropicMaterial.getFromShearAndBulkModuli(1E12, 1.8);
   
   const sigma0 = 1E7;
   
   const crack = new TwoCracksBetweenHomogeneousMaterials(leftCrackShape, rightCrackShape, material, sigma0);
   const g = crack.helperParamG;
   
   const xStart = -10;
   const xEnd = -2;
   
   const step = 0.01;
   
   const resultsMap = new Map<number, number>();
   
   for(let x = xStart; x <= xEnd; x += step) {
      if((x >= c && x <= d) || (x >= a && x <= b)) {
         continue;
      }
      
      const F = crack.getStrainFunctionValue(x);
      const sigma22 = 2 * g * F;
      
      resultsMap.set(x, sigma22);
   }
   
   writeResultsMapToXslx(resultsMap).then(() => {
      console.log("Completed successfully");
   }).catch(err => {
      console.error("An error occurred", err);
   });
}
