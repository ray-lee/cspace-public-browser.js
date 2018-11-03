import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/SortSelect.css';

const propTypes = {
  sortConfig: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default class SortSelect extends Component {
  renderOptions() {
    const { sortConfig } = this.props;

    return Object.keys(sortConfig).map((id) => {
      const { label } = sortConfig[id];

      return (
        <option key={id} value={id}>{label}</option>
      );
    })
  }

  render() {
    const {
      value,
      onChange,
    } = this.props;

    return (
      <div className={styles.common}>
        <select  value={value} onChange={onChange}>
          {this.renderOptions()}
        </select>
      </div>
    )
  }
}

SortSelect.propTypes = propTypes;
