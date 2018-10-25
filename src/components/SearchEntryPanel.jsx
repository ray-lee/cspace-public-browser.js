import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import AdvancedSearchForm from './AdvancedSearchForm';
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
    this.handleScroll = this.handleScroll.bind(this);

    this.prevRect = {};
  }

  componentDidMount() {
    this.focus();

    window.addEventListener('scroll', this.handleScroll);

    this.fireRectChange();
  }

  componentDidUpdate(prevProps) {
    const {
      isExpanded,
    } = this.props;

    const { isExpanded: prevIsExpanded } = prevProps;

    if (isExpanded !== prevIsExpanded) {
      this.fireRectChange();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
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

  fireRectChange() {
    const {
      onRectChange,
    } = this.props;

    if (onRectChange) {
      const rect = this.getRect();

      if (rect.top !== this.prevRect.top) {
        this.prevRect = rect;

        onRectChange(rect);
      }
    }
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

  handleScroll() {
    this.fireRectChange();
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

        {/* <AdvancedSearchForm isOpen={isExpanded} /> */}
      </div>
    );
  }
}

SearchEntryPanel.propTypes = propTypes;
SearchEntryPanel.defaultProps = defaultProps;
