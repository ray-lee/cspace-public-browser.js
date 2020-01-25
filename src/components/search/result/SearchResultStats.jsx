import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../../styles/cspace/SearchResultStats.css';

const propTypes = {
  count: PropTypes.number.isRequired,
}

const messages = defineMessages({
  count: {
    id: 'searchResultStats.count',
    defaultMessage: `{count, plural,
      =0 {No items}
      one {# item}
      other {# items}
    } found`,
  },
});

export default function SearchResultStats(props) {
  const {
    count,
  } = props;

  return (
    <div className={styles.common}>
      <FormattedMessage {...messages.count} values={{ count }} />
    </div>
  );
}

SearchResultStats.propTypes = propTypes;
