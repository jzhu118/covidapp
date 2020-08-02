
import React, { Component } from 'react';
import logo from './logo.svg';
import { allPhasesData as allPhasesData } from './data/allPhasesData';
import { firstPhasesData as firstPhaseData } from './data/firstPhaseData';
import { secondPhasesData as secondPhaseData } from './data/secondPhaseData';
import { thirdPhaseData as thirdPhaseData } from './data/thirdPhaseData';
import ChartD3 from './ChartD3.jsx';
import _ from 'lodash';
import './App.css';
import arrowImage from './arrow.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      data: _.cloneDeep(allPhasesData),
      title: 'U.S. COVID-19 and Unemployment Overview, 01/25/2020 - 07/18/2020',
      type: 'd3'
    };

    this.allPhasesInD3Selected = this.allPhasesInD3Selected.bind(this);
    this.fristPhaseInD3Selected = this.fristPhaseInD3Selected.bind(this);
    this.secondPhaseInD3Selected = this.secondPhaseInD3Selected.bind(this);
    this.thirdPhaseInD3Selected = this.thirdPhaseInD3Selected.bind(this);
  }

  allPhasesInD3Selected() {
    this.setState({
      selected: 1,
      data: _.cloneDeep(allPhasesData),
      title: 'U.S. COVID-19 and Unemployment Overview, 01/25/2020 - 07/18/2020',
      type: 'd3'
    });
  }

  fristPhaseInD3Selected() {
    this.setState({
      selected: 2,
      data: _.cloneDeep(firstPhaseData),
      title: 'Phase 1 - Outbreak,  01/25/2020 - 03/21/2020',
      type: 'd3'
    });
  }

  secondPhaseInD3Selected() {
    this.setState({
      selected: 3,
      data: _.cloneDeep(secondPhaseData),
      title: 'Phase 2 - Steady State, 03/21/2020 - 06/13/2020',
      type: 'd3'
    });
  }

  thirdPhaseInD3Selected() {
    this.setState({
      selected: 4,
      data: _.cloneDeep(thirdPhaseData),
      title: 'Phase 3 - Second Wave, 06/13/2020 - 07/18/2020',
      type: 'd3'
    });
  }

  render() {
    let content;
    content = <ChartD3 data={this.state.data} title={this.state.title} />;
    //<img src={arrowImage} className="image" alt="arrow" />
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>U.S. COVID-19 and Unemployment Interactive Narrative Visualization</h2>
        </div>

        <div className="container">
          <div className="nav">
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 1 ? 'active' : '')} onClick={this.allPhasesInD3Selected}>Overview</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 2 ? 'active' : '')} onClick={this.fristPhaseInD3Selected}>Phase 1</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 3 ? 'active' : '')} onClick={this.secondPhaseInD3Selected}>Phase 2</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 4 ? 'active' : '')} onClick={this.thirdPhaseInD3Selected}>Phase 3</button>
          </div>

          {content}
          
          <div class="annotation" id={(this.state.selected === 1 ? "step0-high-annotation" : '')}>
            <h4>0 annotation</h4>
          </div>
          <div class="annotation" id={(this.state.selected === 2 ? "step1-high-annotation" : '')}>
            <h4>First annotation</h4>
          </div>
          <div class="annotation" id={(this.state.selected === 3 ? "step2-high-annotation" : '')}>
            <h4>Second annotation</h4>
          </div>
          <div class="annotation" id={(this.state.selected === 4 ? "step3-high-annotation" : '')}>
            <h4>Third annotation</h4>
          </div>

        </div>

        <div>
          <p class="text"><span class="textHighlight">Designer:</span></p>
          <p class= "text">Jialiang Zhu, zhu102@illinois.edu</p>
					<p class="text"><span class="textHighlight">Datasource:</span></p>
					<a href="https://www.cdc.gov/covid-data-tracker/index.html#cases">U.S. Centers for Disease Control and Prevention (CDC)</a>
          <p></p>
          <a href="https://fred.stlouisfed.org/series/ICSA">Federal Reserve Bank of St.Louis</a>
        </div>
      </div>
    );
  }
}

export default App;