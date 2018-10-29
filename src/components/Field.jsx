import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/cspace/Field.css';

const propTypes = {
  category: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.shape({
    '_index': PropTypes.string,
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

  const className = styles[classNameProp];

  if (category) {
    return label
      ? <h3 className={className}>{label}</h3>
      : <div className={className}><br/></div>;
  }

  const value = data[name];
  const formattedValue = format ? format(value, name) : value;

  if (formattedValue) {
    if (label) {
      return (
        <div className={className}>
          <dt>{label}</dt><dd>{formattedValue}</dd>
        </div>
      );
    }

    return (
      <div className={className}>{formattedValue}</div>
    );
  }

  return null;
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
