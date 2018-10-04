import React from 'react';
import PropTypes from 'prop-types';
import { MultiList } from '@appbaseio/reactivesearch';
import PanelTitle from './PanelTitle';
import styles from '../../styles/cspace/Filter.css';
import titleStyles from '../../styles/cspace/FilterTitle.css';

const propTypes = {
  field: PropTypes.string.isRequired,
  filterLabel: PropTypes.string,
  id: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool,
  title: PropTypes.string.isRequired,
  togglePanel: PropTypes.func,
};

const defaultProps = {
  filterLabel: null,
  isExpanded: false,
  togglePanel: undefined,
};

export default function Filter(props) {
  const {
    field,
    filterLabel,
    id,
    isExpanded,
    title,
    togglePanel,
    ...remainingProps
  } = props;

  return (
    <MultiList
      className={isExpanded ? styles.expanded : styles.collapsed}
      componentId={id}
      dataField={field}
      filterLabel={filterLabel || title}
      innerClass={{
        checkbox: 'cspace-FilterCheckbox',
        title: 'cspace-FilterTitle',
        input: 'cspace-FilterInput',
        list: 'cspace-FilterList',
        count: 'cspace-FilterCount',
      }}
      size={500}
      sortBy="asc"
      title={
        <PanelTitle
          isExpanded={isExpanded}
          styles={titleStyles}
          title={title}
          onClick={togglePanel}
        />
      }
      placeholder="Search"
      URLParams
      {...remainingProps}
    />
  );
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
