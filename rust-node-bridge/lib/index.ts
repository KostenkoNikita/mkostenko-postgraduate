const _lib = require("./index.node");

export interface ILib {
   factorial: (n: number) => number;
}

export const lib: ILib = {
   factorial: _lib.factorial,
};
