import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages } from 'react-intl';
import IconButton from './IconButton';
import styles from '../../../styles/cspace/ToggleFilterPanelButton.css';

const propTypes = {
  isFilterPanelExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  isFilterPanelExpanded: false,
};

const messages = defineMessages({
  hideLabel: {
    id: 'toggleFilterPanelButton.hide.label',
    defaultMessage: 'Hide filters',
  },
  showLabel: {
    id: 'toggleFilterPanelButton.show.label',
    defaultMessage: 'Show filters',
  },
});

export default function ToggleFilterPanelButton(props) {
  const {
    isFilterPanelExpanded,
    onClick,
  } = props;

  return (
    <IconButton
      className={isFilterPanelExpanded ? styles.expanded : styles.collapsed}
      labelMessage={isFilterPanelExpanded ? messages.hideLabel : messages.showLabel}
      onClick={onClick}
    />
  );
}

ToggleFilterPanelButton.propTypes = propTypes;
ToggleFilterPanelButton.defaultProps = defaultProps;
