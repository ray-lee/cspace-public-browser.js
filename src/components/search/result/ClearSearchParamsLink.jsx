import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { SORT_ID } from '../../../constants/ids';
import { searchParamsToQueryString } from '../../../helpers/urlHelpers';
import styles from '../../../../styles/cspace/SearchParamLink.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
};

const messages = defineMessages({
  label: {
    id: 'clearSearchParamsLink.label',
    defaultMessage: 'Clear all',
  },
});

export default function ClearSearchParamsLink(props) {
  const {
    params,
  } = props;

  const sortParam = params.filter((value, key) => (key === SORT_ID));
  const hasNonSortParam = params.size > sortParam.size;

  if (hasNonSortParam) {
    const queryString = searchParamsToQueryString(sortParam);

    return (
      <Link className={styles.common} to={{ search: `?${queryString}` }}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormattedMessage {...messages.label} />
      </Link>
    );
  }

  return null;
}

ClearSearchParamsLink.propTypes = propTypes;
