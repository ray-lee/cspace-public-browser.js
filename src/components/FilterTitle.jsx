import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/FilterTitle.css';

const propTypes = {
  isExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  isExpanded: false,
};

export default function FilterTitle(props) {
  const {
    isExpanded,
    title,
    ...remainingProps
  } = props;

  return (
    <button
      className={isExpanded ? styles.expanded : styles.collapsed}
      {...remainingProps}
    >
      <div>{title}</div>
    </button>
  );
}

FilterTitle.propTypes = propTypes;
FilterTitle.defaultProps = defaultProps;
