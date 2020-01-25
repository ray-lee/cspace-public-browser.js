import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchResultTile from './SearchResultTile';
import config from '../../../config';
import styles from '../../../../styles/cspace/SearchResultList.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  results: PropTypes.instanceOf(Immutable.List),
};

const defaultProps = {
  results: Immutable.List(),
};

export default class SearchResultList extends Component {
  renderResults() {
    const {
      params,
      results,
    } = this.props;

    const gatewayUrl = config.get('gatewayUrl');

    return results.map((result, index) => (
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
      <div className={styles.common}>
        {this.renderResults()}
      </div>
    );
  }
}

SearchResultList.propTypes = propTypes;
SearchResultList.defaultProps = defaultProps;
