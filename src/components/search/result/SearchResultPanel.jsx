/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchParamList from './SearchParamList';
import SearchResultList from './SearchResultList';
import SearchResultStats from './SearchResultStats';
import SortSelect from '../entry/SortSelectContainer';
import config from '../../../config';
import { SORT_ID } from '../../../constants/ids';
import styles from '../../../../styles/cspace/SearchResultPanel.css';
import cssDimensions from '../../../../styles/dimensions.css';

const propTypes = {
  error: PropTypes.instanceOf(Error),
  isPending: PropTypes.bool,
  nextOffset: PropTypes.number,
  offset: PropTypes.number,
  onHitsUpdated: PropTypes.func,
  result: PropTypes.instanceOf(Immutable.Map),
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
  setSearchPageSize: PropTypes.func,
};

const defaultProps = {
  error: undefined,
  isPending: false,
  nextOffset: undefined,
  offset: undefined,
  onHitsUpdated: undefined,
  params: Immutable.Map(),
  result: undefined,
  search: () => undefined,
  setSearchPageSize: () => undefined,
};

const {
  searchResultTileWidth: cssTileWidth,
  searchResultTileBodyHeight: cssTileBodyHeight,
} = cssDimensions;

const tileWidth = parseInt(cssTileWidth, 10);
const tileBodyHeight = parseInt(cssTileBodyHeight, 10);
const tileHeight = tileWidth + tileBodyHeight;

const calculateSearchPageSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = window.devicePixelRatio || 1;
  const pageSize = ((width / tileWidth) * (height / tileHeight + 2)) / ratio;

  return Math.max(Math.ceil(pageSize), 12);
};

export default class SearchResultPanel extends Component {
  constructor() {
    super();

    this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.ref = React.createRef();
  }

  componentDidMount() {
    const {
      setSearchPageSize,
    } = this.props;

    window.addEventListener('scroll', this.handleScroll, false);

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  handleLoadMoreClick() {
    this.search();
  }

  handleScroll() {
    const {
      nextOffset,
    } = this.props;

    if (nextOffset < config.get('pageAutoLoadLimit')) {
      const {
        search,
      } = this.props;

      const rect = this.ref.current.getBoundingClientRect();
      const bottomOffset = rect.bottom - window.innerHeight;

      if (bottomOffset <= tileHeight) {
        search(config.get('pageLoadDelay'));
      }
    }
  }

  search(fetchDelay) {
    const {
      search,
    } = this.props;

    search(fetchDelay);
  }

  renderError() {
    const {
      error,
    } = this.props;

    return (
      <div>{error.message}</div>
    );
  }

  renderResult() {
    const {
      error,
      isPending,
      nextOffset,
      offset,
      onHitsUpdated,
      params,
      result,
    } = this.props;

    const hitCount = result && result.get('total');
    const hits = result && result.get('hits');

    const showLoadMore = result
      && hits.size < hitCount
      && nextOffset >= config.get('pageAutoLoadLimit');

    return (
      <>
        <header>
          <SearchParamList params={params} />

          <div>
            <SearchResultStats count={hitCount} />
            <SortSelect value={params.get(SORT_ID)} />
          </div>
        </header>

        <SearchResultList
          error={error}
          isPending={isPending}
          offset={offset}
          onHitsUpdated={onHitsUpdated}
          onLoadMoreClick={this.handleLoadMoreClick}
          params={params}
          hits={hits}
          showLoadMore={showLoadMore}
        />
      </>
    );
  }

  render() {
    return (
      <div className={styles.common} ref={this.ref}>
        {this.renderResult()}
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
