import React, { Component } from 'react';
import PropTypes from 'prop-types';
import without from 'lodash/without';

import {
  MultiDropdownList,
  MultiList,
} from '@appbaseio/reactivesearch';

import styles from '../../styles/cspace/FilterPanel.css';

const propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  searchEntryId: PropTypes.string,
};

const defaultProps = {
  filters: [],
  searchEntryId: 'search',
};

export default class FilterPanel extends Component {
  renderFilters() {
    const {
      filters,
      searchEntryId,
    } = this.props;

    const filterIds = filters.map(filter => filter.id);

    return filters.map(filter => {
      const {
        id,
        field,
        title,
      } = filter;

      return (
        <MultiList
          className='cspace-FilterPanelBody'
          componentId={id}
          dataField={field}
          filterLabel={title}
          innerClass={{
            title: 'cspace-FilterPanelTitle',
            input: 'cspace-FilterPanelInput',
            list: 'cspace-FilterPanelList',
            count: 'cspace-FilterPanelCount',
          }}
          key={id}
          title={title}
          placeholder="Search"
          react={{
            and: [searchEntryId, ...without(filterIds, id)],
          }}
          URLParams
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.common}>
        {this.renderFilters()}
      </div>
    );
  }
}

FilterPanel.propTypes = propTypes;
FilterPanel.defaultProps = defaultProps;
