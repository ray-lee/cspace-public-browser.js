import React from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SearchEntryPanelHeader.css';

export default function SearchEntryPanelHeader(props) {
  const {
    id,
    isExpanded,
    // onExpandButtonClick,
  } = props;

  return (
    <div className={isExpanded ? styles.expanded : styles.collapsed}>
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

      {/* <button onClick={onExpandButtonClick} /> */}
    </div>
  );
}
