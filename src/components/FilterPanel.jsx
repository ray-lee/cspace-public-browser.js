import React, { Component } from 'react';
import PropTypes from 'prop-types';
import without from 'lodash/without';
import Filter from '../containers/FilterContainer';
import styles from '../../styles/cspace/FilterPanel.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.arrayOf(PropTypes.object),
  searchEntryId: PropTypes.string,
  top: PropTypes.number,
};

const defaultProps = {
  advancedSearchFields: [],
  filters: [],
  searchEntryId: 'search',
  top: null,
};

export default class FilterPanel extends Component {
  renderFilters() {
    const {
      advancedSearchFields,
      filters,
      searchEntryId,
    } = this.props;

    const filterIds = filters.map(filter => filter.id);
    const advancedSearchIds = advancedSearchFields.map(field => field.id);

    return filters.map(filter => (
      <Filter
        {...filter}
        key={filter.id}
        react={{
          and: [searchEntryId, ...advancedSearchIds, ...without(filterIds, filter.id)],
        }}
      />
    ));
  }

  render() {
    const { top } = this.props;
    const inlineStyle = (top !== null) ? { top } : undefined;

    return (
      <div className={styles.common} style={inlineStyle}>
        {this.renderFilters()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
