import React from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SearchEntryPanel.css';

const propTypes = {
  id: PropTypes.string,
};

const defaultProps = {
  id: 'search',
};

export default function SearchEntryPanel(props) {
  const {
    id,
  } = props;

  return (
    <div className={styles.common}>
      <DataSearch
        autosuggest={false}
        componentId={id}
        dataField="_all"
        placeholder="Search"
        filterLabel="Search"
        URLParams
      />
    </div>
  )
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
