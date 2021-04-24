import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
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

const messages = defineMessages({
  objectStoryHeader: {
    id: 'exhibitionSection.objectStoryHeader',
    defaultMessage: 'Object Story',
  },
  donorStoryHeader: {
    id: 'exhibitionSection.donorStoryHeader',
    defaultMessage: 'Donor Story',
  },
  curatorialStoryHeader: {
    id: 'exhibitionSection.curatorialStoryHeader',
    defaultMessage: 'Curatorial Story',
  },
});

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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <h2><FormattedMessage {...messages.objectStoryHeader} /></h2>
        <div>{historyNote}</div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <h2><FormattedMessage {...messages.donorStoryHeader} /></h2>
        <div>{ownerConrtibutionNote}</div>
        <div>{exhibition[0].generalNote}</div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <h2><FormattedMessage {...messages.curatorialStoryHeader} /></h2>
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
