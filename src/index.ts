import { ICrackShape } from "./core/shape";
import { IsotropicMaterial } from "./core/material";
import { TwoCracksBetweenHomogeneousMaterials } from "./core/cracks";
import { writeResultsMapToXslx } from "./xlsx-writer";

const c = -2;
const a = -1;
const b = 1;
const d = 2;
const leftCrackShape: ICrackShape = {
   xEdgeLeft: c,
   xEdgeRight: a,
};
const rightCrackShape: ICrackShape = {
   xEdgeLeft: b,
   xEdgeRight: d,
};

const material = IsotropicMaterial.getFromShearAndBulkModuli(1E12, 1.8);

const sigma0 = 1E8;

const crack = new TwoCracksBetweenHomogeneousMaterials(leftCrackShape, rightCrackShape, material, sigma0);
const g = crack.helperParamG;

const xStart = -10;
const xEnd = 10;

const step = 0.01;

const resultsMap = new Map<number, number>();

for(let x = xStart; x <= xEnd; x += step) {
   if((x >= c && x <= a) || (x >= b && x <= d)) {
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
