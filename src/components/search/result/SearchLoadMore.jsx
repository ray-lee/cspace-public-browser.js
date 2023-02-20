import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styles from '../../../../styles/cspace/SearchStatus.css';

const messages = defineMessages({
  label: {
    id: 'searchLoadMore.label',
    defaultMessage: 'Load more',
  },
});

const propTypes = {
  onClick: PropTypes.func,
};

const defaultProps = {
  onClick: () => undefined,
};

export default function SearchLoadMore(props) {
  const {
    onClick,
  } = props;

  return (
    <div className={styles.common}>
      <button type="button" onClick={onClick}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FormattedMessage {...messages.label} />
      </button>
    </div>
  );
}

SearchLoadMore.propTypes = propTypes;
SearchLoadMore.defaultProps = defaultProps;
