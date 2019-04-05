import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/ToggleFilterPanelButton.css';
import filterIcon from '../../images/filter.svg';
import hideIcon from '../../images/hideLeft.svg';

const propTypes = {
  isFilterPanelExpanded: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

const defaultProps = {
  isFilterPanelExpanded: false,
};

export default function ToggleFilterPanelButton(props) {
  const {
    isFilterPanelExpanded,
    onClick,
  } = props;

  return (
    <button
      className={styles.common}
      type="button"
      onClick={onClick}
    >
      <img
        alt={isFilterPanelExpanded ? 'Hide filters' : 'Filter results'}
        src={isFilterPanelExpanded ? hideIcon : filterIcon}
      />
    </button>
  );
}

ToggleFilterPanelButton.propTypes = propTypes;
ToggleFilterPanelButton.defaultProps = defaultProps;
