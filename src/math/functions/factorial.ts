export function factorial(n: number) {
   if(!Number.isInteger(n) || n < 0) {
      throw new Error("A non-negative integer number expected");
   }
   
   let result = 1;
   
   for(let i = 1; i <= n; i++) {
      result *= i;
   }
   
   return result;
}
