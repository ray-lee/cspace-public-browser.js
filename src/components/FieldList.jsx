import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import styles from '../../styles/cspace/FieldList.css';

const propTypes = {
  data: PropTypes.shape({
    _index: PropTypes.string,
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  recordType: PropTypes.string,
};

const defaultProps = {
  recordType: undefined,
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
      recordType,
      ...remainingProps
    } = this.props;

    const filteredFields = fields
      .filter(
        field => (field.category || isNotEmpty(data[field.name])),
      )
      .filter((field, index, arr) => {
        if (!field.category) {
          return true;
        }

        const nextField = arr[index + 1];

        return (nextField && !nextField.category);
      });

    return (
      <dl className={styles[recordType]} {...remainingProps}>
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
FieldList.defaultProps = defaultProps;
