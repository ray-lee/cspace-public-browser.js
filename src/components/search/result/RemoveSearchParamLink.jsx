import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { messages } from '../entry/SearchQueryInput';
import config from '../../../config';
import { SEARCH_QUERY_ID } from '../../../constants/ids';
import { searchParamsToQueryString } from '../../../helpers/urlHelpers';
import styles from '../../../../styles/cspace/RemoveSearchParamLink.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const getLabelMessage = (id) => {
  if (id === SEARCH_QUERY_ID) {
    return messages.shortLabel;
  }

  const filterConfig = config.getFilterConfig(id);

  if (filterConfig) {
    const { messages: filterMessages } = filterConfig;

    return (filterMessages.shortLabel || filterMessages.label);
  }

  return undefined;
};

export default function RemoveSearchParamLink(props) {
  const {
    id,
    params,
  } = props;

  const value = params.get(id);

  const queryString = searchParamsToQueryString(params.delete(id));
  const labelMessage = getLabelMessage(id);

  const label = labelMessage
    // eslint-disable-next-line react/jsx-props-no-spreading
    ? <FormattedMessage {...labelMessage} />
    : id;

  return (
    <Link className={styles.common} to={{ search: `?${queryString}` }}>
      {label}
      :
      {' '}
      {Immutable.List.isList(value) ? value.join(', ') : value}
    </Link>
  );
}

RemoveSearchParamLink.propTypes = propTypes;
