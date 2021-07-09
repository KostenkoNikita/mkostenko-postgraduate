import * as _ from "lodash";
import { ICore, ICoreResult } from "./types";
import { Maybe, Nullable } from "../types";

const { lib } = require("../../../rust-node-bridge/bin/index.js");

function wrapWithCoreResult<T, E extends Error>(targetFn: (...args: any[]) => T): (...args: any[]) => ICoreResult<T, E> {
   return function (...args: any[]) {
      let result: Maybe<T> = undefined;
      let error: Nullable<E> = null;
      
      try {
         result = targetFn(...args);
      } catch(e) {
         error = e;
      }
      
      return {
         value: result,
         error,
      }
   };
}

const Core: ICore = {
   math: {
      common: {
         factorial: wrapWithCoreResult<number, Error>(lib.factorial),
      },
   },
};

(function freezeDeep(o: object) {
   Object.freeze(o);
   const keys = Object.keys(o);
   for(const key of keys) {
      const value = o[key];
      if(_.isObjectLike(value)) {
         freezeDeep(value);
      }
   }
})(Core);

export * from "./types";

export {
   Core
};


