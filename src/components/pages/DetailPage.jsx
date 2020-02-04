/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import bodyClassName from '../../helpers/bodyClassName';
import ScrollTopButton from '../layout/ScrollTopButton';
import DetailPanel from '../detail/DetailPanelContainer';
import styles from '../../../styles/cspace/DetailPage.css';

const propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      csid: PropTypes.string,
    }),
  }).isRequired,
  params: PropTypes.instanceOf(Immutable.Map),
  onLeave: PropTypes.func,
  onLocationChange: PropTypes.func,
};

const defaultProps = {
  onLeave: () => undefined,
  onLocationChange: () => undefined,
  params: undefined,
};

export default class DetailPage extends Component {
  componentDidMount() {
    window.document.body.classList.add(bodyClassName(styles.common));

    window.scroll({
      left: 0,
      top: 0,
    });

    this.handleLocationChange();
  }

  componentDidUpdate(prevProps) {
    const {
      location,
    } = this.props;

    const {
      location: prevLocation,
    } = prevProps;

    if (location !== prevLocation) {
      this.handleLocationChange();
    }
  }

  componentWillUnmount() {
    const {
      onLeave,
    } = this.props;

    window.document.body.classList.remove(bodyClassName(styles.common));

    onLeave();
  }

  handleLocationChange() {
    const {
      location,
      match,
      onLocationChange,
    } = this.props;

    onLocationChange(location, match);
  }

  render() {
    const {
      params,
    } = this.props;

    if (!params) {
      return null;
    }

    return (
      <div className={styles.common}>
        <DetailPanel params={params} />
        <ScrollTopButton />
      </div>
    );
  }
}

DetailPage.propTypes = propTypes;
DetailPage.defaultProps = defaultProps;
