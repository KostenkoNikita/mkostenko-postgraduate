import { Nullable } from "@mkostenko/core";

export interface AppRootProps {
}

export interface AppRootState {
   inputValue: string;
   inputIsValid: boolean;
   result: Nullable<number>;
   error: Nullable<Error>;
}
