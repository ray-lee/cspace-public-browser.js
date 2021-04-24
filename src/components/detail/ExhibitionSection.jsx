import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/cspace/Exhibition.css';

const propTypes = {
  exhibition: PropTypes.array,
  historyNote: PropTypes.string,
  ownerConrtibutionNote: PropTypes.string,
  viewerContributionNote: PropTypes.string,
};

const defaultProps = {
  exhibition: undefined,
  historyNote: undefined,
  ownerConrtibutionNote: undefined,
  viewerContributionNote: undefined,
};

export default class ExhibitionSection extends Component {
  constructor() {
    super();

    this.ref = React.createRef();
  }

  renderContent() {
    const {
      exhibition,
      historyNote,
      viewerContributionNote,
      ownerConrtibutionNote,
    } = this.props;

    return (
      <>
        <hr />
        <h1>{exhibition[0].title}</h1>
        <div />
        <h2>Object Story</h2>
        <div>{historyNote}</div>
        <h2>Donor Story</h2>
        <div>{ownerConrtibutionNote}</div>
        <div>{exhibition[0].generalNote}</div>
        <h2>Curatorial Story</h2>
        <div>{viewerContributionNote}</div>
        <div>{exhibition[0].curatorialNote}</div>
      </>
    );
  }

  render() {
    return (
      <div className={styles.exhibitionWrapper}>
        {this.renderContent()}
      </div>
    );
  }
}

ExhibitionSection.propTypes = propTypes;
ExhibitionSection.defaultProps = defaultProps;
