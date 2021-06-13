import * as React from "react";

import { AppRootProps, AppRootState } from "./AppRoot.types";

class AppRoot extends React.Component<AppRootProps, AppRootState> {

   constructor(props: Readonly<AppRootProps>) {
      super(props);
      
      this.state = {};
   }
   
   render() {
      return (
         <div
            style={{
               width: "250px",
               height: "50px",
               backgroundColor: "red",
               margin: "20px 0 0 20px",
            }}
            onClick={() => {
               window["electron"].doThing();
            }}
         >
         
         </div>
      );
   }

}

export {
   AppRoot
}
