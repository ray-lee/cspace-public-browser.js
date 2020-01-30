/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchParamList from './SearchParamList';
import SearchResultList from './SearchResultList';
import SearchResultStats from './SearchResultStats';
import SortSelect from '../entry/SortSelectContainer';
import { SORT_ID } from '../../../constants/ids';
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
  offset: undefined,
  params: Immutable.Map(),
  result: undefined,
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
  constructor() {
    super();

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

  handleScroll() {
    const {
      search,
    } = this.props;

    const rect = this.ref.current.getBoundingClientRect();
    const bottomOffset = rect.bottom - window.innerHeight;

    if (bottomOffset <= 0) {
      search();
    }
  }

  search() {
    const {
      search,
    } = this.props;

    search();
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
      isPending,
      offset,
      params,
      result,
    } = this.props;

    return (
      <>
        <header>
          <SearchParamList params={params} />

          <div>
            <SearchResultStats count={result && result.get('total')} />
            <SortSelect value={params.get(SORT_ID)} />
          </div>
        </header>

        <SearchResultList
          isPending={isPending}
          offset={offset}
          params={params}
          hits={result && result.get('hits')}
        />
      </>
    );
  }

  render() {
    const {
      error,
    } = this.props;

    return (
      <div className={styles.common} ref={this.ref}>
        {error ? this.renderError() : this.renderResult()}
      </div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
