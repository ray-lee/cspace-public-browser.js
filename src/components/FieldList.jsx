import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import styles from '../../styles/cspace/FieldList.css';

const propTypes = {
  data: PropTypes.shape({
    '_index': PropTypes.string,
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

const isNotEmpty = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find(instance => isNotEmpty(instance));
  }

  if (typeof value === 'object') {
    return !!Object.values(value).find(childValue => isNotEmpty(childValue));
  }

  return true;
};

export default class FieldList extends Component {
  render() {
    const {
      data,
      fields,
    } = this.props;

    const filteredFields = fields
      .filter(
        field => (field.category || isNotEmpty(data[field.name]))
      )
      .filter((field, index, fields) => {
        if (!field.category) {
          return true;
        }

        const nextField = fields[index + 1];

        return (nextField && !nextField.category);
      });

    return (
      <dl className={styles.common}>
        {filteredFields.map(field => (
          <Field
            data={data}
            key={field.name}
            {...field}
          />
        ))}
      </dl>
    );
  }
}

FieldList.propTypes = propTypes;
