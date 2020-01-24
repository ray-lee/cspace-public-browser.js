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
  init: PropTypes.func,
  intl: intlShape.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  isFilterPanelExpanded: PropTypes.bool,
  isSearchEntryPanelExpanded: PropTypes.bool,
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
  toggleFilterPanel: PropTypes.func,
  toggleSearchEntryPanel: PropTypes.func,
};

const defaultProps = {
  init: () => undefined,
  isFilterPanelExpanded: false,
  isSearchEntryPanelExpanded: false,
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
    const {
      init,
      location,
    } = this.props;

    window.document.body.classList.add(bodyClassName(styles.common));

    window.scroll({
      left: 0,
      top: 0,
    });

    init(location);
  }

  componentWillUnmount() {
    window.document.body.classList.remove(bodyClassName(styles.common));
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
          <SearchEntryPanel params={params} />

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
