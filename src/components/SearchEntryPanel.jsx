import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SearchEntryPanel.css';

const propTypes = {
  id: PropTypes.string,
};

const defaultProps = {
  id: 'search',
};

export default class SearchEntryPanel extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    if (this.domNode) {
      const input = this.domNode.querySelector('input');

      if (input) {
        input.focus();
      }
    }
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  render() {
    const {
      id,
    } = this.props;

    return (
      <div
        className={styles.common}
        ref={this.handleRef}
      >
        <DataSearch
          autosuggest={false}
          componentId={id}
          debounce={200}
          dataField="_all"
          innerClass={{
            input: 'cspace-SearchEntryPanelInput',
            title: 'cspace-SearchEntryPanelTitle',
            icon: 'foo',
          }}
          placeholder="Search"
          filterLabel="Search"
          URLParams
        />
      </div>
    );
  }
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
