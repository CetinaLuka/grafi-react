import React, { Component } from "react";
import Pdf from "../../assets/Pridobivanje-podatkov.pdf"

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div>
        <h1>Bestmed++</h1>
        <iframe src={Pdf} className="pdf-frame"/>
      </div>
    );
  }
}
