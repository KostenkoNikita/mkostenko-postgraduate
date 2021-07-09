export function isValidNumber(n: any): boolean {
   return !isNaN(parseFloat(n)) && isFinite(n);
}
