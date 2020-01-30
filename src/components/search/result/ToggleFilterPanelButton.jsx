import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import filterIcon from '../../../../images/filter.svg';
import hideIcon from '../../../../images/hideLeft.svg';
import styles from '../../../../styles/cspace/ToggleFilterPanelButton.css';

const propTypes = {
  intl: intlShape.isRequired,
  isFilterPanelExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  isFilterPanelExpanded: false,
};

const messages = defineMessages({
  hide: {
    id: 'ToggleFilterPanelButton.hide',
    defaultMessage: 'Hide filters',
  },
  show: {
    id: 'ToggleFilterPanelButton.show',
    defaultMessage: 'Filter results',
  },
});

function ToggleFilterPanelButton(props) {
  const {
    intl,
    isFilterPanelExpanded,
    onClick,
  } = props;

  const label = intl.formatMessage(isFilterPanelExpanded ? messages.hide : messages.show);

  return (
    <button
      aria-label={label}
      className={styles.common}
      type="button"
      onClick={onClick}
    >
      <img alt="" src={isFilterPanelExpanded ? hideIcon : filterIcon} />
    </button>
  );
}

ToggleFilterPanelButton.propTypes = propTypes;
ToggleFilterPanelButton.defaultProps = defaultProps;

export default injectIntl(ToggleFilterPanelButton);
