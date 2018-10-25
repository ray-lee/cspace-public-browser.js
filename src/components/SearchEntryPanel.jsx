import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AdvancedSearchForm from './AdvancedSearchForm';
import SearchEntryPanelHeader from './SearchEntryPanelHeader';
import styles from '../../styles/cspace/SearchEntryPanel.css';

const propTypes = {
  id: PropTypes.string,
  isExpanded: PropTypes.bool,
  onExpandButtonClick: PropTypes.func,
};

const defaultProps = {
  id: 'search',
  isExpanded: false,
  onExpandButtonClick: null,
};

export default class SearchEntryPanel extends Component {
  componentDidMount() {
    this.focus();
  }

  focus() {
    if (this.domNode) {
      const input = this.domNode.querySelector('input');

      if (input) {
        input.focus();
      }
    }
  }

  render() {
    const {
      id,
      isExpanded,
      onExpandButtonClick,
    } = this.props;

    return (
      <div
        className={isExpanded ? styles.expanded : styles.common}
      >
        <SearchEntryPanelHeader
          id={id}
          isExpanded={isExpanded}
          onExpandButtonClick={onExpandButtonClick}
        />

        {/* <AdvancedSearchForm isOpen={isExpanded} /> */}
      </div>
    );
  }
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
