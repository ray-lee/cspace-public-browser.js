import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../../styles/cspace/SearchPending.css';

const messages = defineMessages({
  loading: {
    id: 'searchPending.loading',
    defaultMessage: 'Loading...',
  },
});

export default function SearchPending() {
  return (
    <div className={styles.common}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormattedMessage {...messages.loading} />
    </div>
  );
}
