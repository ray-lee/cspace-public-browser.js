import React from 'react';
import PropTypes from 'prop-types';
import { MultiList } from '@appbaseio/reactivesearch';
import FilterTitle from './FilterTitle';
import styles from '../../styles/cspace/Filter.css';

const propTypes = {
  field: PropTypes.string.isRequired,
  filterLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
  toggleFilter: PropTypes.func,
};

const defaultProps = {
  filterLabel: null,
  isExpanded: false,
  toggleFilter: undefined,
};

export default function Filter(props) {
  const {
    field,
    filterLabel,
    id,
    isExpanded,
    title,
    toggleFilter,
    ...remainingProps
  } = props;

  return (
    <MultiList
      className={isExpanded ? styles.expanded : styles.collapsed}
      componentId={id}
      dataField={field}
      filterLabel={filterLabel || title}
      innerClass={{
        title: 'cspace-FilterTitle',
        input: 'cspace-FilterInput',
        list: 'cspace-FilterList',
        count: 'cspace-FilterCount',
      }}
      title={<FilterTitle isExpanded={isExpanded} title={title} onClick={toggleFilter} />}
      placeholder="Search"
      URLParams
      {...remainingProps}
    />
  );
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
