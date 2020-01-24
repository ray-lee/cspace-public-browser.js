import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { defineMessages, FormattedMessage } from 'react-intl';
import SearchPending from './SearchPending';
import SearchResultTile from './SearchResultTile';
import config from '../../../config';
import styles from '../../../../styles/cspace/SearchResultList.css';

const propTypes = {
  isPending: PropTypes.bool,
  offset: PropTypes.number,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  hits: PropTypes.instanceOf(Immutable.List),
};

const defaultProps = {
  isPending: false,
  hits: Immutable.List(),
  offset: 0,
};

const messages = defineMessages({
  noResult: {
    id: 'searchResultList.noResult',
    defaultMessage: 'No results found',
  },
});

export default class SearchResultList extends Component {
  renderPending() {
    const {
      isPending,
      offset,
    } = this.props;

    if (!isPending || offset === 0) {
      return undefined;
    }

    return (
      <SearchPending />
    );
  }

  renderHits() {
    const {
      params,
      hits,
    } = this.props;

    if (hits.size === 0) {
      return (
        <p>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.noResult} />
        </p>
      );
    }

    const gatewayUrl = config.get('gatewayUrl');

    return hits.map((result, index) => (
      <SearchResultTile
        gatewayUrl={gatewayUrl}
        index={index}
        key={result.getIn(['_source', 'ecm:name'])}
        params={params}
        result={result}
      />
    ));
  }

  render() {
    return (
      <div className={styles.common} ref={this.domNode}>
        {this.renderHits()}
        {this.renderPending()}
      </div>
    );
  }
}

SearchResultList.propTypes = propTypes;
SearchResultList.defaultProps = defaultProps;
