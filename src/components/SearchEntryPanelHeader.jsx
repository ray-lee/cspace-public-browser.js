import React from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
import FullTextSearchInput from './FullTextSearchInput';
import styles from '../../styles/cspace/SearchEntryPanelHeader.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  isMounted: PropTypes.bool,
};

const defaultProps = {
  isExpanded: false,
  isMounted: false,
};

export default function SearchEntryPanelHeader(props) {
  const {
    id,
    isExpanded,
    isMounted,
    // onExpandButtonClick,
  } = props;

  return (
    <div className={isExpanded ? styles.expanded : styles.collapsed}>
      <FullTextSearchInput id={id} isMounted={isMounted} />
      {/* <button onClick={onExpandButtonClick} /> */}
    </div>
  );
}

SearchEntryPanelHeader.propTypes = propTypes;
SearchEntryPanelHeader.defaultProps = defaultProps;
