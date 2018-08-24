import React from 'react';
import PropTypes from 'prop-types';
import FilterPanel from './FilterPanel';
import SearchResultPanel from './SearchResultPanel';
import styles from '../../styles/cspace/FilteredSearchResultPanel.css';

const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
};

const defaultProps = {
  filters: [],
};

export default function FilteredSearchResultPanel(props) {
  const {
    filters,
  } = props;

  return (
    <div className={styles.common}>
      <FilterPanel filters={filters} />
      <SearchResultPanel {...props} />
    </div>
  )
}

FilteredSearchResultPanel.propTypes = propTypes;
FilteredSearchResultPanel.defaultProps = defaultProps;
