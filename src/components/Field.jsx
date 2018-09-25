import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

const propTypes = {
  category: PropTypes.bool,
  data: PropTypes.shape({
    '_index': PropTypes.string,
  }),
  format: PropTypes.func,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  category: false,
  data: {},
  format: null,
};

export default function Field(props) {
  const {
    category,
    data,
    format,
    label,
    name,
  } = props;

  if (category) {
    return (
      <h3>{label}</h3>
    );
  }

  const value = data[name];
  const formattedValue = format ? format(value, name) : value;

  if (formattedValue) {
    return (
      <div>
        <dt>{label}</dt><dd>{formattedValue}</dd>
      </div>
    );
  }

  return null;
}

Field.propTypes = propTypes;
Field.defaultProps = defaultProps;
