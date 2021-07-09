import { ICrackShape } from "../shape";
import { IsotropicMaterial } from "../material";
import { fullFirstKindEllipticIntegral, fullSecondKindEllipticIntegral } from "../../math";

export class TwoCracksBetweenHomogeneousMaterials {
   
   private readonly  _innerPressure: number;
   
   private readonly _rightCrackShape: ICrackShape;
   
   private readonly _leftCrackShape: ICrackShape;
   
   private readonly _material: IsotropicMaterial;
   
   constructor(leftCrackShape: ICrackShape, rightCrackShape: ICrackShape, material: IsotropicMaterial, innerPressure: number) {
      this._rightCrackShape = rightCrackShape;
      this._leftCrackShape = leftCrackShape;
      
      this._material = material;
      
      this._innerPressure = innerPressure;
   }
   
   get sigma0(): number {
      return this._innerPressure;
   }
   
   get helperParamG(): number {
      const material = this._material;
      return 2 * material.mu / (1 + material.k);
   }
   
   get helperParamL(): number {
      return -this.sigma0 / this.helperParamG;
   }
   
   get helperParamQ(): number {
      const d = this._rightCrackShape.xEdgeRight;
      const c = this._rightCrackShape.xEdgeLeft;
      return Math.sqrt(d * d - c * c) / d;
   }
   
   getStrainFunctionValue(x: number) {
      const xPow2 = x * x;
      
      const d = this._rightCrackShape.xEdgeRight;
      const dPow2 = d * d;
      
      const c = this._rightCrackShape.xEdgeLeft;
      const cPow2 = c * c;
      
      const L = this.helperParamL;
      
      const q = this.helperParamQ;
      
      const E = fullSecondKindEllipticIntegral(q);
      const F = fullFirstKindEllipticIntegral(q);
      
      return ((xPow2 - dPow2 * E / F) / (Math.sqrt((xPow2 - cPow2) * (xPow2 - dPow2))) - 1) * L / 2;
   }
   
}
