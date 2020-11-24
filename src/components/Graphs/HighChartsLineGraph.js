import React, { Component } from "react";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import JSONstat from "jsonstat-toolkit";

export class HighChartsLineGraph extends Component {
    state = {
        url: "http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/tour_occ_arn2?c_resid=TOTAL&precision=1&unit=NR&nace_r2=I551-I553",
        query: {
            "dataset": "tour_occ_arn2",
            "lang": "en",
            "filter": {
                "time": ["2018", "2019"]
            }
        },
        dataset: null,
        options: null,
    };

    componentDidMount() {
        this.setupGraph();
    }
    setupGraph() {
        const dataset = this.props.data;
        if (dataset !== null) {
            const start = dataset.Dimension("time").Category(0).label;
            const geo = dataset.Dimension("geo");
            const options = {
                title: {
                    text: dataset.label
                },
                subtitle: { text: "Source: "+dataset.href },
                yAxis: {
                    title: { text: "number of arrivals" }
                },
                xAxis: {
                    title: { text: "time" }
                },
                series: [],
                plotOptions: {
                    series: {
                        label: {connectorAllowed: false},
                        pointStart: Number(start)
                    }
                }
            }
            for (let index = 0; index < 5; index++) {
                const dataItem = {
                    name: geo.Category(index).label,
                    data: dataset.Data({ geo: geo.id[index] }, false)
                };
                options.series.push(dataItem);
            }
            this.setState({
                options: options
            })
            console.log("highcharts:")
            console.log(dataset);
        }
    }

    render() {
        var chart = '';
        if (this.state.options !== null) {
            chart = (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={this.state.options}
                />
            );
        }
        return (
            <div>
                <br />
                <div>
                    {chart}
                </div>
            </div>
        );
    }
}
