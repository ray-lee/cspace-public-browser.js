import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LIST, MAP, TILE } from '../constants/viewTypes';

const propTypes = {
  // view: PropTypes.string,
  onViewChange: PropTypes.func.isRequired,
};

export default class ViewPicker extends Component {
  constructor() {
    super();

    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick(event) {
    const {
      onViewChange,
    } = this.props;

    if (!onViewChange) {
      return;
    }

    onViewChange(event.currentTarget.value);
  }

  render() {
    return (
      <div>
        View:
        <button onClick={this.handleButtonClick} type="button" value={LIST}>list</button>
        <button onClick={this.handleButtonClick} type="button" value={TILE}>tile</button>
        <button onClick={this.handleButtonClick} type="button" value={MAP}>map</button>
      </div>
    );
  }
}

ViewPicker.propTypes = propTypes;
