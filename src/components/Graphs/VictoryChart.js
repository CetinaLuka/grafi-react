import React, { Component } from "react";
import JSONstat from "jsonstat-toolkit";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryVoronoiContainer, VictoryBar, VictoryAxis } from "victory";
import { convrt } from "../../util/utils"

const format = v => convrt(v);

export class VictoryLineChart extends Component {
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
                <VictoryLine
                    style={{
                        data: { stroke: "#c43a31" },
                        parent: { border: "1px solid #ccc" }
                    }}
                    data={lineElement.data}
                />
            );
            chart = (
                <VictoryChart
                    theme={VictoryTheme.material}
                    padding={80}
                    width={950}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.x}, ${datum.y}`}
                        />
                    }
                >
                    {lineItems}
                </VictoryChart>
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

export class VictorybarChart extends Component {
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
                    x: geo.Category(i).label,
                    y: data[i]
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
        if (this.state.graphData !== null) {
            chart = (
                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    width={800}
                    containerComponent={
                        <VictoryVoronoiContainer
                            labels={({ datum }) => `${datum.x}, ${datum.y}`}
                        />
                    }
                >
                    <VictoryBar
                        horizontal={true}
                        style={{ data: { fill: "#c43a31" } }}
                        data={this.state.graphData}
                    />
                </VictoryChart>
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
