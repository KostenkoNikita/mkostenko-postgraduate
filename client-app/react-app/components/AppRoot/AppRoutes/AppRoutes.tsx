import * as React from "react";
import {AppRoutesProps} from "./AppRoutes.types";
import {Route, Switch} from "react-router-dom";
import {ChartPage} from "../../ChartPage";

export const AppRoutes: React.FC<AppRoutesProps> = () => {
    return (
        <Switch>
            <Route path="/">
                <ChartPage />
            </Route>
        </Switch>
    );
};