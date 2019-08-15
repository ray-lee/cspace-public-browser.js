/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
import bodyClassName from '../helpers/bodyClassName';
import ScrollTopButton from './ScrollTopButton';
import DetailPanelContainer from '../containers/DetailPanelContainer';
import styles from '../../styles/cspace/DetailPage.css';

const propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string,
    state: PropTypes.object,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      csid: PropTypes.string,
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
    const { csid } = match.params;
    const { hash, state } = location;

    const selectedInstitution = hash ? hash.replace(/^#/, '') : undefined;

    return (
      <div className={styles.common}>
        <DetailPanelContainer
          search={state && state.search}
          selectedInstitution={selectedInstitution}
          csid={csid}
          sortField={sortField}
        />
        <ScrollTopButton />
      </div>
    );
  }
}

DetailPage.propTypes = propTypes;
