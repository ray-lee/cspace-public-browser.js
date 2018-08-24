import React from 'react';
import PropTypes from 'prop-types';
import { SelectedFilters } from '@appbaseio/reactivesearch';
import SearchResultList from './SearchResultList';
import styles from '../../styles/cspace/SearchResultPanel.css';

const propTypes = {
  defaultQuery: PropTypes.object,
  filters: PropTypes.arrayOf(PropTypes.object),
  gatewayUrl: PropTypes.string.isRequired,
  sortField: PropTypes.string,
  types: PropTypes.object,
};

const defaultProps = {
  defaultQuery: {},
  filters: [],
  sortField: null,
  types: {},
};

export default function SearchResultPanel(props) {
  const {
    defaultQuery,
    filters,
    gatewayUrl,
    sortField,
    types,
  } = props;

  return (
    <div className={styles.common}>
      {/* <ViewPicker view={view} /> */}
      <SelectedFilters />

      <SearchResultList
        componentId="results"
        defaultQuery={() => defaultQuery}
        filters={filters}
        gatewayUrl={gatewayUrl}
        sortField={sortField}
        types={types}
      />
    </div>
  )
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
