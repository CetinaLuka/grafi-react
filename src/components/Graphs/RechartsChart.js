import React, { Component } from "react";
import JSONstat from "jsonstat-toolkit";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label, BarChart, Bar,  } from 'recharts';
import {convrt} from '../../util/utils';

export class RechartsLineChart extends Component {
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
            console.log(geo);
            const time = dataset.Dimension("time");
            console.log(time);
            var dataArray = [];
            for (let i = 0; i < time.Category().length; i++) {
                const dataArrayItem = {
                    name: time.Category(i).label
                };
                const data = dataset.Data({ time: time.id[i] }, false)
                for (let j = 0; j < data.length; j++) {
                    if (j >= 5)
                        break;
                    dataArrayItem[geo.Category(j).label] = data[j];
                }
                dataArray.push(dataArrayItem);
            }
            this.setState({
                graphData: dataArray
            })
            console.log("recharts:")
            console.log(dataArray);
        }
    }

    render() {
        const dataset = this.props.data;
        const format = v => convrt(v);
        var chart = '';
        if (this.state.graphData !== null) {
            const geo = dataset.Dimension("geo").Category().slice(0, 6);
            console.log(geo);
            const geoItems = geo.map((geoElement) =>
                <Line type="monotone" key={geoElement.label} dataKey={geoElement.label} animationEasing="ease-in-out" />
            );
            chart = (
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                        height={300}
                        data={this.state.graphData}
                        margin={{
                            top: 5, right: 30, left: 40, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis label={{ value: 'Number of arrivals', angle: -90, position: 'insideLeft', offset: 0 }} tickFormatter={format}/>
                        <Tooltip />
                        <Legend />
                        {geoItems}
                    </LineChart>
                </ResponsiveContainer>
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

export class RechartsBarChart extends Component {
    state = {
        graphData: null,
    };

    componentDidMount() {
        this.setupGraphData();
    }
    setupGraphData() {
        const dataset = this.props.data;
        if (dataset !== null) {
            const time = dataset.Dimension("time");
            const geo = dataset.Dimension("geo");
            const data = dataset.Data({ time: time.id[0] }, false)
            var dataArray = [];
            for (let i = 0; i < 10; i++) {
                const dataArrayItem = {
                    area: geo.Category(i).label,
                    "number of arrivals": data[i]
                };
                dataArray.push(dataArrayItem);
            }
            this.setState({
                graphData: dataArray.reverse(),
            })
            console.log("recharts:")
            console.log(dataArray);
        }
    }

    render() {
        var chart = '';
        if (this.state.graphData !== null) {
            const format = v => convrt(v);
            chart = (
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart 
                        width={850} 
                        height={300} 
                        data={this.state.graphData}
                        layout="vertical"
                        margin={{
                            top: 5, right: 45, left: 40, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis  type="number" tickFormatter={format}/>
                        <YAxis type="category" dataKey="area" interval={0}/>
                        <Tooltip />
                        <Bar key="area" dataKey="number of arrivals" animationEasing="ease-in-out" fill="#8884d8" label={{formatter: format }}/>
                    </BarChart>
                </ResponsiveContainer>
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
