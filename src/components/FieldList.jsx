import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNotEmpty } from '../helpers/dataHelpers';
// FIXME
// eslint-disable-next-line import/no-cycle
import Category from './Category';
import Field from './Field';
import styles from '../../styles/cspace/FieldList.css';

const propTypes = {
  data: PropTypes.shape({
    _index: PropTypes.string,
  }).isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  inline: PropTypes.bool,
  recordType: PropTypes.string,
};

const defaultProps = {
  inline: false,
  recordType: undefined,
};

export default function FieldList(props) {
  const {
    data,
    fields,
    inline,
    recordType,
    ...remainingProps
  } = props;

  const renderedFields = fields.map((field) => {
    const {
      fields: childFields,
      inline: categoryInline,
      className,
      format,
      label,
      name,
    } = field;

    if (field.category) {
      return (
        <Category
          className={className}
          data={data}
          fields={childFields}
          inline={categoryInline}
          key={name}
          label={label}
          name={name}
          recordType={recordType}
        />
      );
    }

    const value = data[field.name];

    if (isNotEmpty(value)) {
      return (
        <Field
          className={className}
          format={format}
          key={name}
          label={label}
          name={name}
          value={data[field.name]}
        />
      );
    }

    return null;
  }).filter((item) => !!item);

  if (renderedFields.length > 0) {
    const classes = classNames(
      styles[recordType],
      inline ? styles.inline : styles.grid,
    );

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <dl className={classes} {...remainingProps}>
        {renderedFields}
      </dl>
    );
  }

  return null;
}

FieldList.propTypes = propTypes;
FieldList.defaultProps = defaultProps;
