import React, { Component } from "react";
import { NivoBarChart } from "../Graphs/NivoChart";
import { RechartsBarChart } from "../Graphs/RechartsChart";
import { VictorybarChart } from "../Graphs/VictoryChart";
import { VisBarChart } from "../Graphs/VisChart";
import JSONstat from "jsonstat-toolkit";

export class BarChartsPage extends Component {
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
        if(this.state.dataset !== null)
            graphs = (
                <div>
                    <h5><a href="https://nivo.rocks/" target="_blank">Nivo</a></h5>
                    <NivoBarChart data={this.state.dataset}>
                    </NivoBarChart>
                    <br />
                    <h5><a href="http://recharts.org/en-US/api/BarChart" target="_blank">Recharts</a></h5>
                    <RechartsBarChart data={this.state.dataset}>
                    </RechartsBarChart>
                    <br />
                    <h5><a href="https://formidable.com/open-source/victory/" target="_blank">Victory</a></h5>
                    <VictorybarChart data={this.state.dataset}>
                    </VictorybarChart>
                    <br />
                    <h5><a href="https://github.com/uber/react-vis" target="_blank">Vis</a></h5>
                    <VisBarChart data={this.state.dataset}>
                    </VisBarChart>
                </div>
            );
        return (
            <div>
                <h3>Primerjava grafov tipa BarChart</h3>
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
