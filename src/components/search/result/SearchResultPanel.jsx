/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchResultList from './SearchResultList';
import SearchResultStats from './SearchResultStats';
import SortSelect from '../entry/SortSelectContainer';
import styles from '../../../../styles/cspace/SearchResultPanel.css';
import cssDimensions from '../../../../styles/dimensions.css';

const propTypes = {
  error: PropTypes.instanceOf(Error),
  isPending: PropTypes.bool,
  result: PropTypes.instanceOf(Immutable.Map),
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
  setSearchPageSize: PropTypes.func,
};

const defaultProps = {
  error: undefined,
  isPending: false,
  result: undefined,
  params: Immutable.Map(),
  search: () => undefined,
  setSearchPageSize: () => undefined,
};

const calculateSearchPageSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio || 1;

  const {
    searchResultTileWidth: cssTileWidth,
    searchResultTileBodyHeight: cssTileBodyHeight,
  } = cssDimensions;

  const tileWidth = parseInt(cssTileWidth, 10);
  const tileBodyHeight = parseInt(cssTileBodyHeight, 10);
  const tileHeight = tileWidth + tileBodyHeight;

  const pageSize = ((width / tileWidth) * (height / tileHeight + 2)) / ratio;

  return Math.max(Math.ceil(pageSize), 12);
};

export default class SearchResultPanel extends Component {
  componentDidMount() {
    const {
      setSearchPageSize,
    } = this.props;

    setSearchPageSize(calculateSearchPageSize());

    this.search();
  }

  componentDidUpdate(prevProps) {
    const {
      params,
    } = this.props;

    const {
      params: prevParams,
    } = prevProps;

    if (params !== prevParams) {
      this.search();
    }
  }

  search() {
    const {
      search,
    } = this.props;

    search();
  }

  renderError() {
    return 'Uh oh.';
  }

  renderPending() {
    return 'Loading...';
  }

  renderResult() {
    const {
      params,
      result,
    } = this.props;

    return (
      <>
        <header>
          <SearchResultStats count={result.getIn(['hits', 'total'])} />
          <SortSelect value={params.get('sort')} />
        </header>

        <SearchResultList params={params} results={result.getIn(['hits', 'hits'])} />
      </>
    );
  }

  renderContent() {
    const {
      error,
      isPending,
      result,
    } = this.props;

    if (result) {
      return this.renderResult();
    }

    if (isPending) {
      return this.renderPending();
    }

    if (error) {
      return this.renderError();
    }

    return null;
  }

  render() {
    return (
      <div className={styles.common}>
        {this.renderContent()}
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
