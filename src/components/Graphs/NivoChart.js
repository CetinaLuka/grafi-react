import React, { Component } from "react";
import JSONstat from "jsonstat-toolkit";
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import {convrt} from "../../util/utils";

export class NivoLineChart extends Component {
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
                    id: geo.Category(i).label,
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
                graphData: dataArray,
            })
            console.log("nivo:")
            console.log(dataArray);
        }
    }

    render() {
        var chart = '';
        if (this.state.graphData !== null) {
            chart = (
                <ResponsiveLine
                    data={this.state.graphData}
                    margin={{ top: 50, right: 50, bottom: 150, left: 90 }}
                    xScale={{ type: 'point' }}
                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                    yFormat=" >-.2f"
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        orient: 'bottom',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    axisLeft={{
                        orient: 'left',
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'number of arrivals',
                        legendOffset: -70,
                        legendPosition: 'middle',
                        format: function(value){ 
                            return convrt(value);
                        }
                    }}
                    pointSize={5}
                    pointColor={{ from: 'color', modifiers: [] }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'row',
                            justify: false,
                            translateX: 0,
                            translateY: 80,
                            itemsSpacing: 0,
                            itemDirection: 'left-to-right',
                            itemWidth: 120,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    motionConfig="stiff"
                />
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
export class NivoBarChart extends Component {
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
        graphData: null,
        keys: null
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
            console.log("nivo:")
            console.log(dataArray);
        }
    }

    render() {
        var chart = '';
        if (this.state.graphData !== null) {
            const format = v => convrt(v);
            chart = (

                <ResponsiveBar
                    data={this.state.graphData}
                    keys={['number of arrivals']}
                    indexBy="area"
                    margin={{ top: 0, right: 130, bottom: 50, left: 100 }}
                    groupMode="false"
                    layout="horizontal"
                    valueScale={{ type: 'linear' }}
                    colorBy="index"
                    borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    axisTop={null}
                    axisRight={null}
                    labelFormat={format}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'number of arrivals',
                        legendPosition: 'middle',
                        legendOffset: 32,
                        format: function(value){ 
                            return convrt(value);
                        }
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
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