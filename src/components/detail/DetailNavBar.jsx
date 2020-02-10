import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import get from 'lodash/get';
import { searchParamsToQueryString } from '../../helpers/urlHelpers';
import styles from '../../../styles/cspace/DetailNavBar.css';
import linkStyles from '../../../styles/cspace/Link.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  prev: PropTypes.shape({
    'ecm:name': PropTypes.string,
  }),
  next: PropTypes.shape({
    'ecm:name': PropTypes.string,
  }),
};

const defaultProps = {
  prev: undefined,
  next: undefined,
};

const messages = defineMessages({
  search: {
    id: 'detailNavBar.search',
    defaultMessage: 'Return to search',
  },
  prev: {
    id: 'detailNavBar.prev',
    defaultMessage: 'Previous',
  },
  next: {
    id: 'detailNavBar.next',
    defaultMessage: 'Next',
  },
});

export default function DetailNavBar(props) {
  const {
    params,
    prev,
    next,
  } = props;

  const index = params.get('index');
  const searchParams = params.get('searchParams');

  if (!searchParams || typeof index === 'undefined') {
    return null;
  }

  const searchParamsObj = searchParams.toJS();

  let prevLink;
  let nextLink;

  if (prev) {
    const csid = get(prev, 'ecm:name');

    prevLink = (
      <span>
        <Link
          className={linkStyles.prev}
          to={{
            pathname: `/material/${csid}`,
            state: {
              index: index - 1,
              searchParams: searchParamsObj,
            },
          }}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.prev} />
        </Link>
      </span>
    );
  }

  if (next) {
    const csid = get(next, 'ecm:name');

    nextLink = (
      <span>
        <Link
          className={linkStyles.next}
          to={{
            pathname: `/material/${csid}`,
            state: {
              index: index + 1,
              searchParams: searchParamsObj,
            },
          }}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.next} />
        </Link>
      </span>
    );
  }

  const queryString = searchParamsToQueryString(searchParams);

  return (
    <nav className={styles.common}>
      <div>
        <Link
          className={linkStyles.back}
          to={{
            pathname: '/search',
            search: `?${queryString}`,
          }}
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <FormattedMessage {...messages.search} />
        </Link>
      </div>

      <div>
        {prevLink}
        {nextLink}
      </div>
    </nav>
  );
}

DetailNavBar.propTypes = propTypes;
DetailNavBar.defaultProps = defaultProps;
