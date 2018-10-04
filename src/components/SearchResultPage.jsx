import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../config';
import FilterPanel from './FilterPanel';
import SearchEntryPanel from './SearchEntryPanel';
import SearchResultPanel from './SearchResultPanel';
import styles from '../../styles/cspace/SearchResultPage.css';

const propTypes = {
  isSearchEntryPanelExpanded: PropTypes.bool,
  searchEntryPanelRect: PropTypes.shape({ bottom: PropTypes.number }),
  setSearchEntryPanelRect: PropTypes.func,
  toggleSearchEntryPanel: PropTypes.func,
};

const defaultProps = {
  isSearchEntryPanelExpanded: false,
  searchEntryPanelRect: {},
  setSearchEntryPanelRect: null,
  toggleSearchEntryPanel: null,
};

export default function SearchResultPage(props) {
  const {
    isSearchEntryPanelExpanded,
    searchEntryPanelRect,
    setSearchEntryPanelRect,
    toggleSearchEntryPanel,
  } = props;

  const advancedSearchFields = config.get('advancedSearchFields');
  const defaultQuery = config.get('defaultQuery');
  const filterGroups = config.get('filterGroups');
  const gatewayUrl = config.get('gatewayUrl');
  const sortField = config.get('sortField');
  const types = config.get('types');

  const filterIds = [];

  filterGroups.forEach((filterGroup) => {
    filterIds.push(...filterGroup.filters.map(filter => filter.id));
  });

  return (
    <div className={styles.common}>
      <Helmet>
        <title>Search</title>
      </Helmet>

      <SearchEntryPanel
        isExpanded={isSearchEntryPanelExpanded}
        onExpandButtonClick={toggleSearchEntryPanel}
        onRectChange={setSearchEntryPanelRect}
      />

      <FilterPanel
        advancedSearchFields={advancedSearchFields}
        filterGroups={filterGroups}
        filterIds={filterIds}
        top={searchEntryPanelRect.bottom}
      />

      <SearchResultPanel
        advancedSearchFields={advancedSearchFields}
        defaultQuery={defaultQuery}
        filterGroups={filterGroups}
        filterIds={filterIds}
        gatewayUrl={gatewayUrl}
        sortField={sortField}
        top={searchEntryPanelRect.bottom}
        types={types}
      />
    </div>
  );
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.defaultProps = defaultProps;
