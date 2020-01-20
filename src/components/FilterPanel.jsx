/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FilterGroupContainer from '../containers/FilterGroupContainer';
import styles from '../../styles/cspace/FilterPanel.css';

const propTypes = {
  advancedSearchFields: PropTypes.arrayOf(PropTypes.object),
  filterGroups: PropTypes.arrayOf(PropTypes.object),
  filterIds: PropTypes.arrayOf(PropTypes.string),
  isExpanded: PropTypes.bool,
  isMounted: PropTypes.bool,
  searchEntryId: PropTypes.string,
};

const defaultProps = {
  advancedSearchFields: [],
  filterGroups: [],
  filterIds: [],
  isExpanded: false,
  isMounted: false,
  searchEntryId: 'search',
};

export default class FilterPanel extends Component {
  constructor() {
    super();

    this.handleRef = this.handleRef.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);

    this.setHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  setHeight() {
    if (this.domNode) {
      const height = window.innerHeight;
      const rect = this.domNode.getBoundingClientRect();

      const maxHeight = height - rect.top;

      this.setState({
        height: maxHeight,
      });
    }
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  handleResize() {
    this.setHeight();
  }

  handleScroll() {
    this.setHeight();
  }

  renderFilterGroups() {
    const {
      advancedSearchFields,
      filterGroups,
      filterIds,
      isMounted,
      searchEntryId,
    } = this.props;

    if (!isMounted) {
      // Work around a race condition when navigating back from detail page.
      // If filters are rendered synchronously on mount, the selected filters
      // do not appear.

      return null;
    }

    return filterGroups.map((filterGroup) => (
      <FilterGroupContainer
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...filterGroup}
        advancedSearchFields={advancedSearchFields}
        filterIds={filterIds}
        key={filterGroup.id}
        searchEntryId={searchEntryId}
      />
    ));
  }

  render() {
    const {
      isExpanded,
    } = this.props;

    const {
      height,
    } = this.state;

    const inlineStyle = height ? { height } : undefined;
    const className = isExpanded ? styles.expanded : styles.collapsed;

    return (
      <div
        className={className}
        ref={this.handleRef}
        style={inlineStyle}
      >
        <div>
          <header>Refine results:</header>
          {this.renderFilterGroups()}
        </div>
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
