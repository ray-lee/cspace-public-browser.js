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
  sortField: PropTypes.string,
  types: PropTypes.object,
};

const defaultProps = {
  advancedSearchFields: [],
  defaultQuery: {},
  filterIds: [],
  sortField: null,
  types: {},
};

export default class SearchResultPanel extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      advancedSearchFields,
      defaultQuery,
      filterIds,
      gatewayUrl,
      sortField,
      types,
    } = this.props;

    return (
      <div className={styles.common}>
        <SelectedFilters
          className="cspace-SearchResultListSelectedFilters"
          clearAllLabel="Clear all"
          innerClass={{
            button: 'cspace-SearchResultListSelectedFiltersButton',
          }}
        />

        <SearchResultList
          advancedSearchFields={advancedSearchFields}
          componentId="results"
          defaultQuery={() => defaultQuery}
          filterIds={filterIds}
          gatewayUrl={gatewayUrl}
          sortField={sortField}
          types={types}
        />
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
