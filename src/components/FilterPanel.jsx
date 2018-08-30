import React, { Component } from 'react';
import PropTypes from 'prop-types';
import without from 'lodash/without';
import Filter from '../containers/FilterContainer';
import styles from '../../styles/cspace/FilterPanel.css';

const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  searchEntryId: PropTypes.string,
};

const defaultProps = {
  filters: [],
  searchEntryId: 'search',
};

export default class FilterPanel extends Component {
  renderFilters() {
    const {
      filters,
      searchEntryId,
    } = this.props;

    const filterIds = filters.map(filter => filter.id);

    return filters.map(filter =>
      <Filter
        {...filter}
        key={filter.id}
        react={{
          and: [searchEntryId, ...without(filterIds, filter.id)],
        }}
      />
    );
  }

  render() {
    return (
      <div className={styles.common}>
        {this.renderFilters()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
