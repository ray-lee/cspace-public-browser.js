import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AdvancedSearchForm from './AdvancedSearchForm';
import SearchEntryPanelHeader from './SearchEntryPanelHeader';
import styles from '../../styles/cspace/SearchEntryPanel.css';

const propTypes = {
  id: PropTypes.string,
  isExpanded: PropTypes.bool,
  onExpandButtonClick: PropTypes.func,
  onRectChange: PropTypes.func,
};

const defaultProps = {
  id: 'search',
  isExpanded: false,
  onExpandButtonClick: null,
  onRectChange: null,
};

export default class SearchEntryPanel extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
  }

  componentDidMount() {
    const {
      onRectChange,
    } = this.props;

    this.focus();

    if (onRectChange) {
      onRectChange(this.getRect());
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isExpanded,
      onRectChange,
    } = this.props;

    if (onRectChange) {
      const { isExpanded: prevIsExpanded } = prevProps;

      if (isExpanded !== prevIsExpanded) {
        onRectChange(this.getRect());
      }
    }
  }

  getRect() {
    if (this.domNode) {
      const rect = this.domNode.getBoundingClientRect();

      return {
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
      };
    }

    return undefined;
  }

  focus() {
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
      isExpanded,
      onExpandButtonClick,
    } = this.props;

    return (
      <div
        className={isExpanded ? styles.expanded : styles.common}
        ref={this.handleRef}
      >
        <SearchEntryPanelHeader
          id={id}
          isExpanded={isExpanded}
          onExpandButtonClick={onExpandButtonClick}
        />

        <AdvancedSearchForm isOpen={isExpanded} />
      </div>
    );
  }
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
