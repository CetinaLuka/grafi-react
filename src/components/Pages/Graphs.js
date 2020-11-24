import React, { Component } from "react";
import Pdf from "../../assets/Vizualizacija_Eurostat.pdf"

export class Graphs extends Component {
  static displayName = Graphs.name;

  render() {
    return (
      <div>
        <h1>Bestmed++</h1>
        <iframe src={Pdf} className="pdf-frame"/>
      </div>
    );
  }
}
