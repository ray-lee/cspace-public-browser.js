import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import get from 'lodash/get';
import { messages } from '../entry/SearchQueryInput';
import config from '../../../config';
import { SEARCH_QUERY_ID } from '../../../constants/ids';
import { searchParamsToQueryString } from '../../../helpers/urlHelpers';
import styles from '../../../../styles/cspace/RemoveSearchParamLink.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const VALUE_DELIMITER = ', ';

const getLabelMessage = (id, filterFieldConfig) => {
  if (id === SEARCH_QUERY_ID) {
    return messages.shortLabel;
  }

  if (filterFieldConfig) {
    const { messages: filterFieldMessages } = filterFieldConfig;

    return (filterFieldMessages.shortLabel || filterFieldMessages.label);
  }

  return undefined;
};

const renderLabel = (id, filterFieldConfig) => {
  const labelMessage = getLabelMessage(id, filterFieldConfig);

  return labelMessage
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...labelMessage} />
    : id;
};

const renderValue = (id, filterFieldConfig, params) => {
  const value = params.get(id);
  const formatValue = get(filterFieldConfig, 'formatValue');

  if (Immutable.List.isList(value)) {
    return formatValue
      ? value.map((v) => formatValue(v)).join(VALUE_DELIMITER)
      : value.join(VALUE_DELIMITER);
  }

  return formatValue
    ? formatValue(value)
    : value;
};

export default function RemoveSearchParamLink(props) {
  const {
    id,
    params,
  } = props;

  const filterFieldConfig = config.getFilterFieldConfig(id);
  const queryString = searchParamsToQueryString(params.delete(id));
  const label = renderLabel(id, filterFieldConfig);
  const value = renderValue(id, filterFieldConfig, params);

  return (
    <Link className={styles.common} to={{ search: `?${queryString}` }}>
      {label}
      :
      {' '}
      {value}
    </Link>
  );
}

RemoveSearchParamLink.propTypes = propTypes;
