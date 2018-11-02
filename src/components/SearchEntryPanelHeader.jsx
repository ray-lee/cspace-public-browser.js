import React, { Component } from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SearchEntryPanelHeader.css';

export default class SearchEntryPanelHeader extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        mounted: true,
      });
    }, 0)
  }

  renderDataSearch() {
    const {
      id,
    } = this.props;

    if (!this.state.mounted) {
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

  render() {
    const {
      id,
      isExpanded,
      // onExpandButtonClick,
    } = this.props;

    return (
      <div className={isExpanded ? styles.expanded : styles.collapsed}>
        {this.renderDataSearch()}
        {/* <button onClick={onExpandButtonClick} /> */}
      </div>
    );
  }
}
