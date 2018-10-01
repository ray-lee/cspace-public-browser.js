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
  top: PropTypes.number,
  types: PropTypes.object,
};

const defaultProps = {
  advancedSearchFields: [],
  defaultQuery: {},
  filterIds: [],
  sortField: null,
  top: null,
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
      top,
      types,
    } = this.props;

    const inlineStyle = (top !== null) ? { paddingTop: top } : undefined;

    return (
      <div className={styles.common} style={inlineStyle}>
        <SelectedFilters
          className="cspace-SearchResultListSelectedFilters"
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
