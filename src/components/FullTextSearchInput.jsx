import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactiveComponent } from '@appbaseio/reactivesearch';
import SearchInputWrapper from './SearchInputWrapper';
import styles from '../../styles/cspace/FullTextSearchInput.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  isMounted: PropTypes.bool,
};

const defaultProps = {
  isMounted: false,
};

export default class FullTextSearchInput extends Component {
  render() {
    const {
      id,
      isMounted,
    } = this.props;

    if (!isMounted) {
      // Work around a race condition when navigating back from detail page.
      // If the DataSearch is rendered synchronously on mount, it does not
      // appear in the selected filters.

      return <div className="cspace-FullTextSearchInput"></div>;
    }

    // return (
    //   <DataSearch
    //     autosuggest={false}
    //     className={styles.common}
    //     componentId={id}
    //     debounce={500}
    //     dataField="_all"
    //     innerClass={{
    //       input: 'cspace-FullTextSearchInput',
    //     }}
    //     placeholder="Search materials"
    //     filterLabel="Search"
    //     URLParams
    //   />
    // );

    return (
      <ReactiveComponent
        className={styles.common}
        componentId={id}
        filterLabel="Search"
        URLParams
      >
        <SearchInputWrapper />
      </ReactiveComponent>
    );
  }
}

FullTextSearchInput.propTypes = propTypes;
FullTextSearchInput.defaultProps = defaultProps;
