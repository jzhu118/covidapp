
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import chart from './chartD3.js';
import _ from 'lodash';

class ChartD3 extends Component {

  componentDidMount() {
    let el = ReactDOM.findDOMNode(this);
	
		chart.create(el, {
			width: 1200,
			height: 600
		}, this.getChartState());
  }

  componentDidUpdate() {
    chart.update(this.getChartState());
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextProps.data, this.props.data);
  }

  getChartState() {
    return {
      data: this.props.data,
      title: this.props.title
    };
  }

  componentWillUnmount() {
    let el = ReactDOM.findDOMNode(this);
    chart.cleanUp(el);
  }

  render() {
    return (
      <div className='chart'></div>
    );
  }
}

ChartD3.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string
};

export default ChartD3;