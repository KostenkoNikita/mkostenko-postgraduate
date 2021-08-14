import * as React from "react";
import {
   BrowserRouter as Router,
} from "react-router-dom";

import { AppRootProps, AppRootState } from "./AppRoot.types";
import {AppRoutes} from "./AppRoutes";

class AppRoot extends React.Component<AppRootProps, AppRootState> {

   constructor(props: Readonly<AppRootProps>) {
      super(props);
      
      this.state = {
      };
   }
   
   render() {
      return (
         <Router>
            <AppRoutes/>
         </Router>
      );
   }

}

export {
   AppRoot
}
