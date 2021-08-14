import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Chart, registerables } from 'chart.js';

import { AppRoot } from "./components/AppRoot";

function renderApp() {
   ReactDOM.render (
      <AppRoot/>,
      document.getElementById("app-root-element")
   );
}

Chart.register(...registerables);
renderApp();
