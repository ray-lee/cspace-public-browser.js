import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import SearchEntryForm from './SearchEntryFormContainer';
import styles from '../../../../styles/cspace/SearchEntryPanel.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  params: undefined,
};

export default function SearchEntryPanel(props) {
  const {
    params,
  } = props;

  return (
    <div className={styles.common}>
      <SearchEntryForm params={params} />
    </div>
  );
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
