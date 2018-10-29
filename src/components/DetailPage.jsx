import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import bodyClassName from '../helpers/bodyClassName';
import ScrollTopButton from './ScrollTopButton';
import DetailPanel from './DetailPanel';
import styles from '../../styles/cspace/DetailPage.css';

const propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      shortID: PropTypes.string,
    }),
  }).isRequired,
};

export default class DetailPage extends Component {
  componentDidMount() {
    window.document.body.classList.add(bodyClassName(styles.common));

    window.scroll({
      left: 0,
      top: 0,
    });
  }

  componentWillUnmount() {
    window.document.body.classList.remove(bodyClassName(styles.common));
  }

  render() {
    const {
      location,
      match,
    } = this.props;

    const sortField = config.get('sortField');
    const { shortID } = match.params;
    const { hash, state } = location;

    const selectedInstitution = hash ? hash.replace(/^#/, '') : undefined;

    return (
      <div className={styles.common}>
        <DetailPanel
          isFromSearch={state && state.isFromSearch}
          searchParams={state && state.searchParams}
          selectedInstitution={selectedInstitution}
          shortID={shortID}
          sortField={sortField}
        />
        <ScrollTopButton />
      </div>
    );
  }
}

DetailPage.propTypes = propTypes;
