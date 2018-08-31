import React from 'react';
import Helmet from 'react-helmet';
import config from '../config';
import FilterPanel from './FilterPanel';
import SearchEntryPanel from './SearchEntryPanel';
import SearchResultPanel from './SearchResultPanel';
import styles from '../../styles/cspace/SearchPage.css';

export default function SearchPage() {
  const defaultQuery = config.get('defaultQuery');
  const filters = config.get('filters');
  const gatewayUrl = config.get('gatewayUrl');
  const sortField = config.get('sortField');
  const types = config.get('types');

  return (
    <div className={styles.common}>
      <Helmet>
        <title>Search</title>
      </Helmet>

      <SearchEntryPanel />
      <FilterPanel filters={filters} />

      <SearchResultPanel
        defaultQuery={defaultQuery}
        filters={filters}
        gatewayUrl={gatewayUrl}
        sortField={sortField}
        types={types}
      />
    </div>
  );
}
