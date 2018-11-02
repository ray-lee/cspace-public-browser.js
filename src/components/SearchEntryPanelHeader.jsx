import React from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
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

const renderDataSearch = (props) => {
  const {
    id,
    isMounted,
  } = props;

  if (!isMounted) {
    // Work around a race condition when navigating back from detail page.
    // If the DataSearch is rendered synchronously on mount, it does not
    // appear in the selected filters.

    return <div className="cspace-SearchInput"></div>;
  }

  return (
    <DataSearch
      autosuggest={false}
      className="cspace-DataSearch"
      componentId={id}
      debounce={500}
      dataField="_all"
      innerClass={{
        input: 'cspace-SearchInput',
        title: 'cspace-SearchInputTitle',
      }}
      placeholder="Search materials"
      filterLabel="Search"
      URLParams
    />
  );
}

export default function SearchEntryPanelHeader(props) {
  const {
    isExpanded,
    // onExpandButtonClick,
  } = props;

  return (
    <div className={isExpanded ? styles.expanded : styles.collapsed}>
      {renderDataSearch(props)}
      {/* <button onClick={onExpandButtonClick} /> */}
    </div>
  );
}

SearchEntryPanelHeader.propTypes = propTypes;
SearchEntryPanelHeader.defaultProps = defaultProps;
