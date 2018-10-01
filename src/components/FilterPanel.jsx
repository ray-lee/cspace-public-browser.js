import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterGroupContainer from '../containers/FilterGroupContainer';
import styles from '../../styles/cspace/FilterPanel.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  filterGroups: PropTypes.arrayOf(PropTypes.object),
  filterIds: PropTypes.arrayOf(PropTypes.string),
  searchEntryId: PropTypes.string,
  top: PropTypes.number,
};

const defaultProps = {
  advancedSearchFields: [],
  filterGroups: [],
  filterIds: [],
  searchEntryId: 'search',
  top: null,
};

export default class FilterPanel extends Component {
  renderFilterGroups() {
    const {
      advancedSearchFields,
      filterGroups,
      filterIds,
      searchEntryId,
    } = this.props;

    return filterGroups.map(filterGroup => (
      <FilterGroupContainer
        {...filterGroup}
        filterIds={filterIds}
        key={filterGroup.id}
        advancedSearchFields={advancedSearchFields}
        searchEntryId={searchEntryId}
      />
    ));
  }

  render() {
    const { top } = this.props;
    const inlineStyle = (top !== null) ? { top } : undefined;

    return (
      <div className={styles.common} style={inlineStyle}>
        {this.renderFilterGroups()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
