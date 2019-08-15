import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import { findMaterialPrevNext } from '../actions/material';
import styles from '../../styles/cspace/DetailNavBar.css';
import linkStyles from '../../styles/cspace/Link.css';

const propTypes = {
  csid: PropTypes.string.isRequired,
  search: PropTypes.shape({
    index: PropTypes.number,
    params: PropTypes.string,
    query: PropTypes.object,
  }),
};

const defaultProps = {
  search: undefined,
};

export default class DetailNavBar extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.findPrevNext();
  }

  componentDidUpdate(prevProps) {
    const { search } = this.props;
    const { search: prevSearch } = prevProps;

    if (prevSearch !== search) {
      this.findPrevNext();
    }
  }

  findPrevNext() {
    const {
      csid,
      search,
    } = this.props;

    if (search) {
      const { index, query } = search;

      findMaterialPrevNext(query, index, csid)
        .then((result) => {
          this.setState({
            prev: result.prev,
            next: result.next,
          });
        });
    }
  }

  render() {
    const {
      search,
    } = this.props;

    const {
      prev,
      next,
    } = this.state;

    if (!search) {
      return null;
    }

    let prevLink;
    let nextLink;

    if (prev) {
      const csid = get(prev, ['_source', 'ecm:name']);
      const title = get(prev, ['_source', 'collectionspace_denorm:title']);

      prevLink = (
        <Link
          className={linkStyles.prev}
          to={{
            pathname: `/material/${csid}`,
            state: {
              search: Object.assign({}, search, {
                index: search.index - 1,
              }),
            },
          }}
        >
          {title}
        </Link>
      );
    }

    if (next) {
      const csid = get(next, ['_source', 'ecm:name']);
      const title = get(next, ['_source', 'collectionspace_denorm:title']);

      nextLink = (
        <Link
          className={linkStyles.next}
          to={{
            pathname: `/material/${csid}`,
            state: {
              search: Object.assign({}, search, {
                index: search.index + 1,
              }),
            },
          }}
        >
          {title}
        </Link>
      );
    }

    return (
      <nav className={styles.common}>
        <div>
          <Link
            className={linkStyles.back}
            to={{
              pathname: '/search',
              search: search.params,
            }}
          >
            Return to search
          </Link>
        </div>

        <div>
          {prevLink}
          {nextLink}
        </div>
      </nav>
    );
  }
}

DetailNavBar.propTypes = propTypes;
DetailNavBar.defaultProps = defaultProps;
