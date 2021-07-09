import { Maybe, Nullable } from "../types";

export interface ICommon {
   factorial: (n: number) => ICoreResult<number, Error>;
}

export interface IMath {
   common: ICommon;
}

export interface ICore {
   math: IMath;
}

export interface ICoreResult<T, E extends Error> {
   value: Maybe<T>;
   error: Nullable<E>;
}
