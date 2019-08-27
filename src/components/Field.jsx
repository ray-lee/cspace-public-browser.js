import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../styles/cspace/Field.css';

const propTypes = {
  className: PropTypes.string,
  format: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.number,
    PropTypes.string,
    PropTypes.object,
  ]),
};

const defaultProps = {
  className: undefined,
  format: undefined,
  label: undefined,
  value: undefined,
};

export default function Field(props) {
  const {
    className: classNameProp,
    format,
    label,
    name,
    value,
  } = props;

  const classes = classNames(styles.common, styles[classNameProp]);
  const formattedValue = format ? format(value, name) : value;

  if (formattedValue) {
    if (label) {
      return (
        <React.Fragment>
          <dt className={classes}>{label}</dt>
          <dd className={classes}>{formattedValue}</dd>
        </React.Fragment>
      );
    }

    return (
      <div className={classes}>{formattedValue}</div>
    );
  }
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
