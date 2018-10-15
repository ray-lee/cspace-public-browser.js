import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/FieldValueList.css';

const propTypes = {
  children: PropTypes.node,
  inline: PropTypes.bool,
};

const defaultProps = {
  childen: null,
  inline: false,
};

export default function FieldValueList(props) {
  const {
    children,
    inline,
  } = props;

  const className = inline ? styles.inline : styles.common;

  return (
    <ul className={className}>
      {children}
    </ul>
  );
}

FieldValueList.propTypes = propTypes;
FieldValueList.defaultProps = defaultProps;