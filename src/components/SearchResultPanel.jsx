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

    this.handleRef = this.handleRef.bind(this);

    this.state = {
      scrollTarget: undefined,
    };
  }

  handleRef(ref) {
    this.setState({
      scrollTarget: ref,
    });
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
      <div className={styles.common} ref={this.handleRef}>
        {/* <ViewPicker view={view} /> */}

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
          scrollTarget={this.state.scrollTarget}
          sortField={sortField}
          types={types}
        />
      </div>
    )
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
