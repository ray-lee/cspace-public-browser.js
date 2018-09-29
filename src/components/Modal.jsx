import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/Modal.css';

const propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.element,
}

const defaultProps = {
  isOpen: false,
  children: null,
};

export default function Modal(props) {
  const {
    children,
    isOpen,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.common}>
      <div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
