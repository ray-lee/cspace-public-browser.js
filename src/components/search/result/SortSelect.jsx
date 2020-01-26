import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import styles from '../../../../styles/cspace/SortSelect.css';

const propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

const defaultProps = {
  onChange: undefined,
  value: undefined,
};

const messages = defineMessages({
  label: {
    id: 'sortSelect.label',
    defaultMessage: 'Sort results by',
  },
  bestmatch: {
    id: 'sortSelect.bestmatch',
    defaultMessage: 'Best match',
  },
  atoz: {
    id: 'sortSelect.atoz',
    defaultMessage: 'A to Z',
  },
  ztoa: {
    id: 'sortSelect.ztoa',
    defaultMessage: 'Z to A',
  },
  newest: {
    id: 'sortSelect.newest',
    defaultMessage: 'Newest',
  },
  oldest: {
    id: 'sortSelect.oldest',
    defaultMessage: 'Oldest',
  },
});

function SortSelect(props) {
  const {
    intl,
    value,
    onChange,
  } = props;

  return (
    <select
      className={styles.common}
      value={value}
      onChange={onChange}
    >
      {
        ['bestmatch', 'atoz', 'ztoa', 'newest', 'oldest'].map((value) => (
          <option key={value} value={value}>{intl.formatMessage(messages[value])}</option>
        ))
      }
    </select>
  );
}

SortSelect.propTypes = propTypes;
SortSelect.defaultProps = defaultProps;

export default injectIntl(SortSelect);
