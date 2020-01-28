import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { SEARCH_QUERY_ID } from '../../../constants/ids';
import { messages } from '../entry/SearchQueryInput';
import { paramsToQueryString } from '../../../helpers/urlHelpers';
import styles from '../../../../styles/cspace/RemoveSearchParamLink.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const getLabelMessage = (id) => {
  if (id === SEARCH_QUERY_ID) {
    return messages.shortLabel;
  }

  return undefined;
};

export default function RemoveSearchParamLink(props) {
  const {
    id,
    params,
  } = props;

  const value = params.get(id);
  const queryString = paramsToQueryString(params.delete(id));
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
      {value}
    </Link>
  );
}

RemoveSearchParamLink.propTypes = propTypes;
