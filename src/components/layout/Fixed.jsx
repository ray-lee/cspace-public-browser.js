import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../styles/cspace/Fixed.css';

const propTypes = {
  children: PropTypes.element,
};

const defaultProps = {
  children: undefined,
};

export default function Fixed(props) {
  const {
    children,
  } = props;

  return (
    <div className={styles.common}>
      {children}
    </div>
  );
}

Fixed.propTypes = propTypes;
Fixed.defaultProps = defaultProps;
