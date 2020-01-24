import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../../styles/cspace/SearchSubmitButton.css';

const messages = defineMessages({
  submit: {
    id: 'searchEntryForm.submit',
    defaultMessage: 'Search',
  },
});

export default function SearchSubmitButton() {
  return (
    <button
      className={styles.common}
      type="submit"
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <FormattedMessage {...messages.submit} />
    </button>
  );
}
