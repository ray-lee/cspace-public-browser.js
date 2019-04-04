import React from 'react';
import styles from '../../styles/cspace/ToggleFilterPanelButton.css';
import filterIcon from '../../images/filter.svg';
import hideIcon from '../../images/hideLeft.svg';

export default function ToggleFilterPanelButton(props) {
  const {
    isFilterPanelExpanded,
    onClick,
  } = props;

  return (
    <button
      className={styles.common}
      onClick={onClick}
    >
      <img
        alt={isFilterPanelExpanded ? 'Hide filters' : 'Filter results'}
        src={isFilterPanelExpanded ? hideIcon : filterIcon}
      />
    </button>
  );
}
