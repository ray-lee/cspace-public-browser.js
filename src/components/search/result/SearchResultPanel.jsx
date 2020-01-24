import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import styles from '../../../../styles/cspace/SearchResultPanel.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map),
  search: PropTypes.func,
};

const defaultProps = {
  params: Immutable.Map(),
  search: () => undefined,
};

export default class SearchResultPanel extends PureComponent {
  componentDidMount() {
    this.search();
  }

  componentDidUpdate() {
    this.search();
  }

  search() {
    const {
      params,
      search,
    } = this.props;

    search(params);
  }

  render() {
    return (
      <div className={styles.common}>Results</div>
    );
  }
}

SearchResultPanel.propTypes = propTypes;
SearchResultPanel.defaultProps = defaultProps;
