import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from '../../styles/cspace/Field.css';

const propTypes = {
  category: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.shape({
    _index: PropTypes.string,
  }),
  format: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  category: false,
  className: undefined,
  data: {},
  format: null,
  label: null,
};

export default function Field(props) {
  const {
    category,
    className: classNameProp,
    data,
    format,
    label,
    name,
  } = props;

  const classes = classNames(styles.common, styles[classNameProp]);

  if (category) {
    return label
      ? <h3 className={classes}>{label}</h3>
      : <div className={classes}><br /></div>;
  }

  const value = data[name];
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

  return null;
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
