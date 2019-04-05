/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import qs from 'qs';
import get from 'lodash/get';
import { SelectedFilters } from '@appbaseio/reactivesearch';
import SearchResultList from './SearchResultList';
import SortSelect from './SortSelect';
import styles from '../../styles/cspace/SearchResultPanel.css';

const hasQueryType = (query, types) => {
  const keys = Object.keys(query);

  if (keys.find(key => types.find(type => type === key))) {
    return true;
  }

  return keys.reduce((found, key) => {
    if (found) {
      return true;
    }

    const child = query[key];

    if (!child || typeof child !== 'object') {
      return false;
    }

    return hasQueryType(child, types);
  }, false);
};

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  defaultQuery: PropTypes.objectOf(PropTypes.object),
  filterIds: PropTypes.arrayOf(PropTypes.string),
  gatewayUrl: PropTypes.string.isRequired,
  includeFields: PropTypes.arrayOf(PropTypes.string),
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    state: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
  isMounted: PropTypes.bool,
  sortField: PropTypes.string,
  types: PropTypes.objectOf(PropTypes.object),
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

class SearchResultPanel extends Component {
  constructor() {
    super();

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSortSelectChange = this.handleSortSelectChange.bind(this);

    this.state = {};
  }

  getSortConfig() {
    const { sortField } = this.props;

    return {
      bestmatch: {
        label: 'Best match',
        query: [
          {
            _score: {
              order: 'desc',
            },
          },
          {
            [sortField]: {
              order: 'asc',
            },
          },
        ],
      },
      atoz: {
        label: 'A to Z',
        query: [
          {
            [sortField]: {
              order: 'asc',
            },
          },
        ],
      },
      ztoa: {
        label: 'Z to A',
        query: [
          {
            [sortField]: {
              order: 'desc',
            },
          },
        ],
      },
      newest: {
        label: 'Newest to oldest',
        query: [
          {
            'collectionspace_core:createdAt': {
              order: 'desc',
            },
          },
        ],
      },
      oldest: {
        label: 'Oldest to newest',
        query: [
          {
            'collectionspace_core:createdAt': {
              order: 'asc',
            },
          },
        ],
      },
    };
  }

  handleQueryChange(prevQuery, nextQuery) {
    this.setState({
      hasSearchOrFilter: hasQueryType(nextQuery, ['multi_match', 'terms']),
    });
  }

  handleSortSelectChange(event) {
    const { value } = event.target;

    const {
      history,
      location,
    } = this.props;

    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

    params.sort = JSON.stringify(value);

    history.replace({
      hash: location.hash,
      pathname: location.pathname,
      search: qs.stringify(params, { addQueryPrefix: true }),
      state: location.state,
    });
  }

  renderSearchResultList(sortQuery) {
    const {
      advancedSearchFields,
      defaultQuery,
      filterIds,
      gatewayUrl,
      includeFields,
      isMounted,
      types,
    } = this.props;

    if (!isMounted) {
      return null;
    }

    return (
      <SearchResultList
        advancedSearchFields={advancedSearchFields}
        componentId="results"
        defaultQuery={() => ({
          query: defaultQuery,
          sort: sortQuery,
        })}
        filterIds={filterIds}
        gatewayUrl={gatewayUrl}
        includeFields={includeFields}
        types={types}
        onQueryChange={this.handleQueryChange}
      />
    );
  }

  render() {
    const {
      location,
    } = this.props;

    const {
      hasSearchOrFilter,
    } = this.state;

    const sortConfig = this.getSortConfig();

    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const sortParam = params.sort;

    let sortID = sortParam && JSON.parse(params.sort);

    if (!sortID) {
      sortID = hasSearchOrFilter ? 'bestmatch' : 'newest';
    }

    const sortQuery = sortID && get(sortConfig, [sortID, 'query']);

    return (
      <div className={styles.common}>
        <SelectedFilters
          className="cspace-SelectedFilters"
          clearAllLabel="Clear all"
          innerClass={{
            button: 'cspace-SelectedFiltersButton',
          }}
        />

        <SortSelect sortConfig={sortConfig} value={sortID} onChange={this.handleSortSelectChange} />

        {this.renderSearchResultList(sortQuery)}
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;

export default withRouter(SearchResultPanel);
