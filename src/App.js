import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { LineChartsPage } from './components/Pages/LineChartsPage';
import { BarChartsPage } from './components/Pages/BarChartsPage';
import { Home } from './components/Pages/Home';
import { Graphs } from './components/Pages/Graphs';
import './custom.css'


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/linechart' component={LineChartsPage} />
        <Route path='/barchart' component={BarChartsPage} />
        <Route path='/graphs' component={Graphs} />
      </Layout>
    );
  }
}