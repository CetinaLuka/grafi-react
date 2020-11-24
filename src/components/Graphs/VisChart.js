import React, { Component } from "react";
import JSONstat from "jsonstat-toolkit";
import { XYPlot, LineSeries, HorizontalGridLines, XAxis, YAxis, HorizontalBarSeries, LabelSeries, VerticalBarSeries } from "react-vis";
import 'react-vis/dist/style.css';
import { convrt } from "../../util/utils";


export class VisLineChart extends Component {
    state = {
        graphData: null,
    };

    componentDidMount() {
        this.setupGraphData()
    }
    setupGraphData() {
        const dataset = this.props.data;
        if (dataset !== null) {
            const geo = dataset.Dimension("geo");
            const time = dataset.Dimension("time");
            var dataArray = [];
            for (let i = 0; i < 5; i++) {
                const dataArrayItem = {
                    data: []
                };
                const data = dataset.Data({ geo: geo.id[i] }, false)
                for (let j = 0; j < data.length; j++) {
                    const dataItem = {
                        x: time.Category(j).label,
                        y: data[j]
                    }
                    dataArrayItem.data.push(dataItem);
                }
                dataArray.push(dataArrayItem);
            }
            this.setState({
                graphData: dataArray
            })
            console.log("victory:")
            console.log(dataArray);
        }
    }

    render() {
        var chart = '';
        if (this.state.graphData !== null) {
            const lineItems = this.state.graphData.map((lineElement) =>
                <LineSeries
                    getNull={(d) => d.y !== null}
                    data={lineElement.data} />
            );
            chart = (
                <XYPlot xType="ordinal"
                    width={800}
                    height={300}
                    padding={100}
                >
                    <HorizontalGridLines />
                    {lineItems}
                    <XAxis />
                    <YAxis tickFormat={tick => convrt(tick)} />
                </XYPlot>
            );
        }
        return (
            <div>
                <br />
                <div className="line-graph-wrapper">
                    {chart}
                </div>
            </div>
        );
    }
}



export class VisBarChart extends Component {
    state = {
        graphData: null,
    };

    componentDidMount() {
        this.setupGraphData();
    }
    setupGraphData() {
        const dataset = this.props.data;
        if (dataset !== null) {
            const geo = dataset.Dimension("geo");
            const time = dataset.Dimension("time");
            const data = dataset.Data({ time: time.id[0] }, false)
            var dataArray = [];
            for (let i = 0; i < 10; i++) {
                const dataArrayItem = {
                    x: data[i],
                    y: geo.Category(i).label,
                };
                dataArray.push(dataArrayItem);
            }
            this.setState({
                graphData: dataArray
            })
            console.log("victory:")
            console.log(dataArray);
        }
    }

    render() {
        var chart = '';
        var chart2 = '';
        if (this.state.graphData !== null) {
            chart = (
                <XYPlot
                    yType="ordinal"
                    width={1050}
                    height={500}
                    margin={{ bottom: 40, left: 90, right: 10, top: 20 }}
                >
                    <XAxis tickFormat={tick => convrt(tick)} />
                    <YAxis left={0} xType="string" />
                    <HorizontalBarSeries
                        data={this.state.graphData}
                    />

                    <LabelSeries
                        data={this.state.graphData.map(obj => {
                            return { ...obj, label: convrt(obj.x)}
                        })}
                        labelAnchorX="middle"
                        labelAnchorY="middle"
                    />
                </XYPlot>
            );
        }
        return (
            <div>
                <br />
                <div className="line-graph-wrapper">
                    {chart}
                </div>
            </div>
        );
    }
}