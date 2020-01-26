import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchResultList from './SearchResultList';
import SearchResultStats from './SearchResultStats';
import SortSelect from './SortSelect';
import styles from '../../../../styles/cspace/SearchResultPanel.css';

const propTypes = {
  error: PropTypes.instanceOf(Error),
  isPending: PropTypes.bool,
  result: PropTypes.instanceOf(Immutable.Map),
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
};

const defaultProps = {
  error: undefined,
  isPending: false,
  result: undefined,
  params: Immutable.Map(),
  search: () => undefined,
};

export default class SearchResultPanel extends Component {
  componentDidMount() {
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
      params,
      search,
    } = this.props;

    if (params) {
      search(params);
    }
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
          <SortSelect />
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
