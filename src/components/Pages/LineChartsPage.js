import React, { Component } from "react";
import { HighChartsLineGraph } from "../Graphs/HighChartsLineGraph";
import { NivoLineChart } from "../Graphs/NivoChart";
import { RechartsLineChart } from "../Graphs/RechartsChart";
import { VictoryLineChart } from "../Graphs/VictoryChart";
import { VisLineChart } from "../Graphs/VisChart";
import JSONstat from "jsonstat-toolkit";


export class LineChartsPage extends Component {
    state = {
        url: "http://ec.europa.eu/eurostat/wdds/rest/data/v2.1/json/en/tour_occ_arn2?c_resid=TOTAL&precision=1&unit=NR&nace_r2=I551-I553",
        query: {
            "dataset": "tour_occ_arn2",
            "lang": "en",
            "filter": {
            }
        },
        dataset: null
    };

    async componentDidMount() {
        await JSONstat(this.state.url).then(res => {
            if (res.class !== "error") {
                this.setState({
                    dataset: res,
                });
            }
            else {
                console.log("error");
            }
        });
    }

    render() {
        var graphs = '';
        if (this.state.dataset !== null)
            graphs = (
                <div>
                    <h5><a href="https://github.com/highcharts/highcharts" target="_blank">HighCharts - licenčna :(</a></h5><h6><a href="https://github.com/highcharts/highcharts-react" target="_blank">React komponenta</a></h6>
                    <HighChartsLineGraph data={this.state.dataset} test="test">
                    </HighChartsLineGraph>
                    <br />
                    <h5><a href="https://nivo.rocks/" target="_blank">Nivo</a></h5>
                    <NivoLineChart data={this.state.dataset}>
                    </NivoLineChart>
                    <br />
                    <h5><a href="http://recharts.org/en-US" target="_blank">Recharts</a></h5>
                    <RechartsLineChart data={this.state.dataset}>
                    </RechartsLineChart>
                    <br />
                    <h5><a href="https://formidable.com/open-source/victory/" target="_blank">Victory</a></h5>
                    <VictoryLineChart data={this.state.dataset}>
                    </VictoryLineChart>
                    <br />
                    <h5><a href="https://github.com/uber/react-vis" target="_blank">Vis</a></h5>
                    <VisLineChart data={this.state.dataset}>
                    </VisLineChart>
                </div>
            );
        return (
            <div>
                <h3>Primerjava grafov tipa LineChart</h3>
                <span>
                    <a href={this.state.url} target="_blank"> json data</a>
                </span>
                <br />
                <br />
                {graphs}
            </div>
        );
    }
}
