/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import FilterGroup from './FilterGroup';
import config from '../../../config';
import styles from '../../../../styles/cspace/FilterPanel.css';

const propTypes = {
  isExpanded: PropTypes.bool,
  isPending: PropTypes.bool,
  result: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isExpanded: false,
  isPending: false,
  result: Immutable.Map(),
};

const messages = defineMessages({
  title: {
    id: 'FilterPanel.title',
    defaultMessage: 'Refine results:',
  },
});

export default class FilterPanel extends Component {
  constructor() {
    super();

    this.handleResize = this.handleResize.bind(this);
    // this.handleScroll = this.handleScroll.bind(this);

    this.ref = React.createRef();

    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    // window.addEventListener('scroll', this.handleScroll);

    this.setHeight();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    // window.removeEventListener('scroll', this.handleScroll);
  }

  setHeight() {
    const height = window.innerHeight;
    const rect = this.ref.current.getBoundingClientRect();
    const maxHeight = height - rect.top;

    this.setState({
      height: maxHeight,
    });
  }

  handleResize() {
    this.setHeight();
  }

  // handleScroll() {
  //   this.setHeight();
  // }

  renderFilterGroups() {
    const {
      isPending,
      result,
    } = this.props;

    return config.get('filterGroups').map((filterGroupConfig) => (
      <FilterGroup
        config={filterGroupConfig}
        key={filterGroupConfig.id}
        isPending={isPending}
        aggregations={result.get('aggregations')}
      />
    ));
  }

  renderContent() {
    const {
      result,
    } = this.props;

    if (!result.get('total')) {
      return undefined;
    }

    return (
      <div>
        <header>
          <FormattedMessage {...messages.title} />
        </header>

        {this.renderFilterGroups()}
      </div>
    );
  }

  render() {
    const {
      isExpanded,
    } = this.props;

    const {
      height,
    } = this.state;

    const className = isExpanded ? styles.expanded : styles.collapsed;
    const inlineStyle = height ? { height } : undefined;

    return (
      <div
        className={className}
        ref={this.ref}
        style={inlineStyle}
      >
        {this.renderContent()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
