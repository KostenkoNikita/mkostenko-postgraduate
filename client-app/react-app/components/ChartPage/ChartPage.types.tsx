import {RouteComponentProps} from "react-router-dom";

export interface ChartPageBaseProps {}

export type ChartPageExtensionProps = RouteComponentProps;

export type ChartPageProps = ChartPageBaseProps & ChartPageExtensionProps;

export interface ChartPageState {
}