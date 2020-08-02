
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
      title: 'Whole Picture: Weekly ICSA and New Cases of US from 01/25/2020 to 07/18/2020 in D3',
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
      title: 'Whole Picture: Weekly ICSA and New Cases of US from 01/25/2020 to 07/18/2020 in D3',
      type: 'd3'
    });
  }

  fristPhaseInD3Selected() {
    this.setState({
      selected: 2,
      data: _.cloneDeep(firstPhaseData),
      title: 'First Phase: Weekly ICSA and New Cases of US from 01/25/2020 to 03/21/2020 in D3',
      type: 'd3'
    });
  }

  secondPhaseInD3Selected() {
    this.setState({
      selected: 3,
      data: _.cloneDeep(secondPhaseData),
      title: 'Second Phase: Weekly ICSA and New Cases of US from 03/28/2020 to 06/13/2020 in D3',
      type: 'd3'
    });
  }

  thirdPhaseInD3Selected() {
    this.setState({
      selected: 4,
      data: _.cloneDeep(thirdPhaseData),
      title: 'Third Phase: Weekly ICSA and New Cases of US from 06/20/2020 to 07/18/2020 in D3',
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
          <h2>Weekly ICSA and New Cases of US from 01/25/2020 to 07/18/2020 in D3</h2>
        </div>

        <div className="container">
          <div className="nav">
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 1 ? 'active' : '')} onClick={this.allPhasesInD3Selected}>Whole Picture</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 2 ? 'active' : '')} onClick={this.fristPhaseInD3Selected}>First Phase</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 3 ? 'active' : '')} onClick={this.secondPhaseInD3Selected}>Second Phase</button>
            <button type='button' className={"btn btn-d3 " + (this.state.selected === 4 ? 'active' : '')} onClick={this.thirdPhaseInD3Selected}>Third Phase</button>
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
          <p className="text">blah blah</p>
        </div>
      </div>
    );
  }
}

export default App;