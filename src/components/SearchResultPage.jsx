import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../config';
import bodyClassName from '../helpers/bodyClassName';
import FilterPanel from './FilterPanel';
import SearchEntryPanel from './SearchEntryPanel';
import SearchResultPanel from './SearchResultPanel';
import ScrollTopButton from './ScrollTopButton';
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

export default class SearchResultPage extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    window.document.body.classList.add(bodyClassName(styles.common));

    window.scroll({
      left: 0,
      top: 0,
    });

    window.setTimeout(() => {
      this.setState({
        isMounted: true,
      });
    }, 0);
  }

  componentWillUnmount() {
    window.document.body.classList.remove(bodyClassName(styles.common));
  }

  render() {
    const {
      isFilterPanelExpanded,
      isSearchEntryPanelExpanded,
      toggleFilterPanel,
      toggleSearchEntryPanel,
    } = this.props;

    const {
      isMounted,
    } = this.state;

    const advancedSearchFields = config.get('advancedSearchFields');
    const defaultQuery = config.get('defaultQuery');
    const filterGroups = config.get('filterGroups');
    const gatewayUrl = config.get('gatewayUrl');
    const includeFields = config.get('includeFields');
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
            isMounted={isMounted}
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
            isMounted={isMounted}
          />
        </div>

        <SearchResultPanel
          advancedSearchFields={advancedSearchFields}
          defaultQuery={defaultQuery}
          filterGroups={filterGroups}
          filterIds={filterIds}
          gatewayUrl={gatewayUrl}
          includeFields={includeFields}
          isMounted={isMounted}
          sortField={sortField}
          types={types}
        />

        <ScrollTopButton />
      </div>
    );
  }
}

SearchResultPage.propTypes = propTypes;
SearchResultPage.defaultProps = defaultProps;
