import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/PanelTitle.css';

const propTypes = {
  isExpanded: PropTypes.bool,
  styles: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
  }),
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
};

const defaultProps = {
  styles,
  isExpanded: false,
};

export default function PanelTitle(props) {
  const {
    isExpanded,
    styles,
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

PanelTitle.propTypes = propTypes;
PanelTitle.defaultProps = defaultProps;
