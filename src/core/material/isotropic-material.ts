export class IsotropicMaterial {

   private readonly _shearModulus: number;
   
   private readonly _bulkModulus: number;
   
   private constructor(shearModulus: number, bulkModulus: number) {
      this._shearModulus = shearModulus;
      this._bulkModulus = bulkModulus;
   }
   
   public get mu(): number {
      return this._shearModulus;
   }
   
   public get k(): number {
      return this._bulkModulus;
   }
   
   public static getFromShearAndBulkModuli(shearModulus: number, bulkModulus: number): IsotropicMaterial {
      return new IsotropicMaterial(shearModulus, bulkModulus);
   }
   
}
