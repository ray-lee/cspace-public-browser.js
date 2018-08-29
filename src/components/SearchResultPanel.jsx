import React, { Component } from 'react';
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

export default class SearchResultPanel extends Component {
  constructor() {
    super();

    this.state = {
      scrollTarget: undefined,
    };
  }

  render() {
    const {
      defaultQuery,
      filters,
      gatewayUrl,
      sortField,
      types,
    } = this.props;

    return (
      <div className={styles.common}>
        <SelectedFilters
          className='cspace-SearchResultListSelectedFilters'
          innerClass={{
            button: 'cspace-SearchResultListSelectedFiltersButton',
          }}
        />

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
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
