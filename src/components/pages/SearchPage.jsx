/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import config from '../../config';
import bodyClassName from '../../helpers/bodyClassName';
import Fixed from '../layout/Fixed';
import FilterPanel from '../FilterPanel';
import SearchEntryPanel from '../search/entry/SearchEntryPanel';
import SearchResultPanel from '../search/result/SearchResultPanelContainer';
import ScrollTopButton from '../ScrollTopButton';
import ToggleFilterPanelButton from '../ToggleFilterPanelButton';
import styles from '../../../styles/cspace/SearchPage.css';

const propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  isFilterPanelExpanded: PropTypes.bool,
  isSearchEntryPanelExpanded: PropTypes.bool,
  onLocationChange: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
  toggleFilterPanel: PropTypes.func,
  toggleSearchEntryPanel: PropTypes.func,
};

const defaultProps = {
  isFilterPanelExpanded: false,
  isSearchEntryPanelExpanded: false,
  onLocationChange: () => undefined,
  params: undefined,
  search: () => undefined,
  toggleFilterPanel: null,
  toggleSearchEntryPanel: null,
};

const messages = defineMessages({
  title: {
    id: 'searchPage.title',
    defaultMessage: 'Search',
  },
});

class SearchPage extends Component {
  componentDidMount() {
    window.document.body.classList.add(bodyClassName(styles.common));

    window.scroll({
      left: 0,
      top: 0,
    });

    this.handleLocationChange();
  }

  componentDidUpdate(prevProps) {
    const {
      location,
    } = this.props;

    const {
      location: prevLocation,
    } = prevProps;

    if (location !== prevLocation) {
      this.handleLocationChange();
    }
  }

  componentWillUnmount() {
    window.document.body.classList.remove(bodyClassName(styles.common));
  }

  handleLocationChange() {
    const {
      location,
      onLocationChange,
    } = this.props;

    onLocationChange(location);
  }

  render() {
    const {
      intl,
      isFilterPanelExpanded,
      isSearchEntryPanelExpanded,
      location,
      params,
      toggleFilterPanel,
      toggleSearchEntryPanel,
    } = this.props;

    if (!params) {
      return null;
    }

    const advancedSearchFields = config.get('advancedSearchFields');
    const defaultQuery = config.get('defaultQuery');
    const filterGroups = config.get('filterGroups');
    const gatewayUrl = config.get('gatewayUrl');
    const includeFields = config.get('includeFields');
    const sortField = config.get('sortField');
    const types = config.get('types');

    const filterIds = [];

    filterGroups.forEach((filterGroup) => {
      filterIds.push(...filterGroup.filters.map((filter) => filter.id));
    });

    const title = intl.formatMessage(messages.title);

    return (
      <div className={styles.common}>
        <Helmet>
          <title>{title}</title>
        </Helmet>

        <Fixed>
          <SearchEntryPanel />

          {/* <ToggleFilterPanelButton
            isFilterPanelExpanded={isFilterPanelExpanded}
            onClick={toggleFilterPanel}
          /> */}

          {/* <FilterPanel
            advancedSearchFields={advancedSearchFields}
            filterGroups={filterGroups}
            filterIds={filterIds}
            isExpanded={isFilterPanelExpanded}
          /> */}
        </Fixed>

        <SearchResultPanel params={params} />
        <ScrollTopButton />
      </div>
    );
  }
}

SearchPage.propTypes = propTypes;
SearchPage.defaultProps = defaultProps;

export default injectIntl(withRouter(SearchPage));
