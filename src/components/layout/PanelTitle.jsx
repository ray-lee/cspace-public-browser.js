import React from 'react';
import PropTypes from 'prop-types';
import cssStyles from '../../../styles/cspace/PanelTitle.css';

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
  styles: cssStyles,
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
      type="button"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...remainingProps}
    >
      <div>{title}</div>
    </button>
  );
}

PanelTitle.propTypes = propTypes;
PanelTitle.defaultProps = defaultProps;
