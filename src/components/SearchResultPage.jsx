import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../config';
import FilterPanel from './FilterPanel';
import SearchEntryPanel from './SearchEntryPanel';
import SearchResultPanel from './SearchResultPanel';
import ToggleFilterPanelButton from './ToggleFilterPanelButton';
import styles from '../../styles/cspace/SearchResultPage.css';
import fixedStyles from '../../styles/cspace/Fixed.css';

const propTypes = {
  isFilterPanelExpanded: PropTypes.bool,
  isSearchEntryPanelExpanded: PropTypes.bool,
  toggleFilterPanel: PropTypes.func,
  toggleSearchEntryPanel: PropTypes.func,
};

const defaultProps = {
  isFilterEntryPanelExpanded: false,
  isSearchEntryPanelExpanded: false,
  toggleFilterPanel: null,
  toggleSearchEntryPanel: null,
};

export default function SearchResultPage(props) {
  const {
    isFilterPanelExpanded,
    isSearchEntryPanelExpanded,
    toggleFilterPanel,
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

      <div className={fixedStyles.common}>
        <SearchEntryPanel
          isExpanded={isSearchEntryPanelExpanded}
          onExpandButtonClick={toggleSearchEntryPanel}
        />

        <ToggleFilterPanelButton
          isFilterPanelExpanded={isFilterPanelExpanded}
          onClick={toggleFilterPanel}
        />

        <FilterPanel
          advancedSearchFields={advancedSearchFields}
          filterGroups={filterGroups}
          filterIds={filterIds}
          isExpanded={isFilterPanelExpanded}
        />
      </div>

      <SearchResultPanel
        advancedSearchFields={advancedSearchFields}
        defaultQuery={defaultQuery}
        filterGroups={filterGroups}
        filterIds={filterIds}
        gatewayUrl={gatewayUrl}
        sortField={sortField}
        types={types}
      />
    </div>
  );
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.defaultProps = defaultProps;
