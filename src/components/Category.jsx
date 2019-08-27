import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isNotEmpty } from '../helpers/dataHelpers';
import FieldList from './FieldList';
import styles from '../../styles/cspace/Category.css';

const propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    _index: PropTypes.string,
  }),
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })),
  inline: PropTypes.bool,
  label: PropTypes.string,
  recordType: PropTypes.string,
};

const defaultProps = {
  className: undefined,
  data: {},
  fields: [],
  inline: false,
  label: undefined,
  recordType: undefined,
};

export default function Category(props) {
  const {
    className: classNameProp,
    data,
    fields,
    inline,
    label,
    recordType,
  } = props;

  if (fields.find(field => isNotEmpty(data[field.name]))) {
    const classes = classNames(styles.common, styles[classNameProp]);
    const title = label ? <h3>{label}</h3> : null;

    return (
      <div className={classes}>
        {title}
        <FieldList
          data={data}
          fields={fields}
          inline={inline}
          recordType={recordType}
        />
      </div>
    );
  }

  return null;
}

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;
