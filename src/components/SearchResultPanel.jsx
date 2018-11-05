import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SelectedFilters } from '@appbaseio/reactivesearch';
import SearchResultList from './SearchResultList';
import styles from '../../styles/cspace/SearchResultPanel.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  defaultQuery: PropTypes.object,
  filterIds: PropTypes.arrayOf(PropTypes.string),
  gatewayUrl: PropTypes.string.isRequired,
  includeFields: PropTypes.arrayOf(PropTypes.string),
  isMounted: PropTypes.bool,
  sortField: PropTypes.string,
  types: PropTypes.object,
};

const defaultProps = {
  advancedSearchFields: [],
  defaultQuery: {},
  filterIds: [],
  includeFields: null,
  isMounted: false,
  sortField: null,
  types: {},
};

export default class SearchResultPanel extends Component {
  constructor() {
    super();
  }

  renderSearchResultList() {
    const {
      advancedSearchFields,
      defaultQuery,
      filterIds,
      gatewayUrl,
      includeFields,
      isMounted,
      sortField,
      types,
    } = this.props;

    if (!isMounted) {
      return null;
    }

    return (
      <SearchResultList
        advancedSearchFields={advancedSearchFields}
        componentId="results"
        defaultQuery={() => defaultQuery}
        filterIds={filterIds}
        gatewayUrl={gatewayUrl}
        includeFields={includeFields}
        sortField={sortField}
        types={types}
      />
    );
  }

  render() {
    return (
      <div className={styles.common}>
        <SelectedFilters
          className="cspace-SelectedFilters"
          clearAllLabel="Clear all"
          innerClass={{
            button: 'cspace-SelectedFiltersButton',
          }}
        />

        {this.renderSearchResultList()}
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
