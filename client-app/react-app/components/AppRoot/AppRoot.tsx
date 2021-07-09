import * as React from "react";
import autobind from "autobind-decorator";

import { AppRootProps, AppRootState } from "./AppRoot.types";
import { ELECTRON_API_KEY, FACTORIAL_API_ITEM, isValidNumber } from "../../../electron/shared";
import { ICoreResult, Nullable } from "@mkostenko/core";
import { Promise } from "bluebird";

class AppRoot extends React.Component<AppRootProps, AppRootState> {

   private _currentComputationPromise: Nullable<any>;
   
   constructor(props: Readonly<AppRootProps>) {
      super(props);
      
      this.state = {
         inputValue: "",
         inputIsValid: false,
         result: null,
         error: null,
      };
      
      this._currentComputationPromise = null;
   }
   
   @autobind
   handleSubmitButtonClick() {
      const {
         inputIsValid,
      } = this.state;
   
      if(!inputIsValid) {
         return;
      }
   
      this.computeFactorial().then((result: Nullable<number>) => {
         this.setState({
            result,
         });
      }).catch((error: Error) => {
         this.setState({
            error,
         });
      });
   }
   
   private computeFactorial(): Promise<Nullable<number>> {
      const {
         inputValue,
      } = this.state;
      
      const inputValueNum = +inputValue;

      this._currentComputationPromise = new Promise((resolve, reject) => {
         window[ELECTRON_API_KEY][FACTORIAL_API_ITEM.method](inputValueNum, (res: ICoreResult<number, Error>) => {
            if(res.error) {
               reject(res.error);
            } else {
               resolve(res.value ?? null);
            }
         });
      }).finally(() => {
         this._currentComputationPromise = null;
      });
      
      return this._currentComputationPromise!;
   }
   
   private cancelFactorialComputation() {
      this._currentComputationPromise?.cancel()
   }
   
   @autobind
   handleInputChange(e: any) {
      this.cancelFactorialComputation();
      
      const nextValue = e.target.value;
      
      this.setState({
         inputValue: nextValue,
         result: null,
         error: null,
         inputIsValid: isValidNumber(nextValue),
      });
   }
   
   render() {
      const {
         inputValue,
         inputIsValid,
         error,
         result,
      } = this.state;
      
      return (
         <div>
            <div
               style={{
                  margin: "20px 20px 0 20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center"
               }}
            >
               <span>Factorial of</span>
               <input
                  style={{
                     marginLeft: "7px",
                  }}
                  onChange={this.handleInputChange}
                  value={inputValue}
               />
            </div>
            <div
               style={{
                  margin: "5px 20px 5px 20px",
               }}
            >
               <div
                  style={{
                     padding: "10px",
                     display: "flex",
                     flexDirection: "row",
                     alignItems: "center",
                     justifyContent: "center",
                     maxWidth: "200px",
                     border: "1px solid #000000",
                     cursor: inputIsValid? "pointer" : "not-allowed",
                  }}
                  onClick={this.handleSubmitButtonClick}
               >
                  <span>Submit</span>
               </div>
            </div>
            {result !== null? <div
               style={{
                  margin: "20px 20px 0 20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
               }}
            >
               <span>Result:</span>
               <span style={{ marginLeft: "5px" }}>{result}</span>
            </div> : null}
            {error? <div
               style={{
                  margin: "20px 20px 0 20px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
               }}
            >
               <span>Error:</span>
               <span style={{ marginLeft: "5px" }}>{error.message}</span>
            </div> : null}
         </div>
      );
   }

}

export {
   AppRoot
}
