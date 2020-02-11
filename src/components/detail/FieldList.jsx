import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import styles from '../../../styles/cspace/FieldList.css';
import categoryStyles from '../../../styles/cspace/FieldListCategory.css';
import fieldStyles from '../../../styles/cspace/FieldListField.css';

const propTypes = {
  config: PropTypes.shape({
    categories: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    'collectionspace_core:refName': PropTypes.string,
    'collectionspace_denorm:title': PropTypes.string,
  }).isRequired,
};

const renderField = (id, fieldConfig, data) => {
  const {
    className,
    field,
    format,
    label,
    messages,
  } = fieldConfig;

  const title = messages
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...messages.label} />
    : label;

  const value = data[field];
  const formattedValue = (format && value) ? format(value, id) : value;

  if (!formattedValue) {
    return null;
  }

  if (title) {
    const classes = classNames(fieldStyles[className]);
    const classProp = classes ? { className: classes } : undefined;

    return (
      <React.Fragment key={id}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <h4 {...classProp}>{title}</h4>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <div {...classProp}>{formattedValue}</div>
      </React.Fragment>
    );
  }

  const classes = classNames(fieldStyles.unlabeled, fieldStyles[className]);

  return (
    <div className={classes} key={id}>
      {formattedValue}
    </div>
  );
};

const renderCategory = (id, categoryConfig, config, data) => {
  const {
    className,
    fields,
    label,
    messages,
  } = categoryConfig;

  const title = messages
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...messages.label} />
    : label;

  const fieldsConfig = config.fields;

  const renderedFields = fields
    .map((fieldId) => renderField(fieldId, fieldsConfig[fieldId], data))
    .filter((renderedField) => !!renderedField);

  if (renderedFields.length === 0) {
    return null;
  }

  const classes = classNames(categoryStyles.common, categoryStyles[className]);

  return (
    <div className={classes} key={id}>
      {title && <h3>{title}</h3>}
      <div>
        {renderedFields}
      </div>
    </div>
  );
};

export default function FieldList(props) {
  const {
    config,
    data,
  } = props;

  const {
    categories,
    layout,
  } = config;

  return Object.keys(layout).map((layoutId) => (
    <div
      className={styles.common}
      key={layoutId}
      style={{ gridArea: layoutId }}
    >
      {layout[layoutId].map((catId) => renderCategory(catId, categories[catId], config, data))}
    </div>
  ));
}

FieldList.propTypes = propTypes;
