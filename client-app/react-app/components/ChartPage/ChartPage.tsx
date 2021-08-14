import * as React from "react";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import autobind from "autobind-decorator";
import {Chart, ChartConfiguration} from "chart.js";

import {Nullable} from "@mkostenko/core";

import {ChartPageProps, ChartPageState} from "./ChartPage.types";

export class ChartPageBase extends React.Component<ChartPageProps, ChartPageState> {

    private _chartCanvasRef: Nullable<HTMLCanvasElement>;
    private _chart: Nullable<Chart>;

    constructor(props: Readonly<ChartPageProps>) {
        super(props);

        this.state = {};

        this._chartCanvasRef = null;
        this._chart = null;
    }

    componentWillUnmount() {
        this.disposeChart();
    }

    @autobind
    private handleChartCanvasRef(ref: Nullable<HTMLCanvasElement>) {
        const chartExists = !!this._chartCanvasRef;

        this._chartCanvasRef = ref;

        if(!chartExists && ref) {
            this.initExampleChart();
        }
    }

    private initExampleChart() {
        const chartCanvas = this._chartCanvasRef;
        if(!chartCanvas) {
            return;
        }

        const labels = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
        ];
        const data = {
            labels: labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(0, 255, 0)',
                borderColor: 'rgb(255, 0, 0)',
                data: [0, 10, 5, 2, 20, 30, 45],
            }]
        };
        const config: ChartConfiguration = {
            type: 'line',
            data,
            options: {}
        };

        this._chart = new Chart(
            chartCanvas,
            config
        );
    }

    private disposeChart() {
        this._chart?.destroy();
    }

    render() {
        return (
            <div>
                <p>Chart Basic Example</p>
                <div
                    style={{
                        width: "500px",
                        height: "500px",
                    }}
                >
                    <canvas
                        ref={this.handleChartCanvasRef}
                    />
                </div>
            </div>
        );
    }

}

export const ChartPage = compose(withRouter)(ChartPageBase);