import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import without from 'lodash/without';
import Filter from '../containers/FilterContainer';
import styles from '../../styles/cspace/FilterGroup.css';

const renderFilters = (props) => {
  const {
    advancedSearchFields,
    filters,
    filterIds,
    searchEntryId,
  } = props;

  const advancedSearchIds = advancedSearchFields.map(field => field.id);

  return filters.map(filter => (
    <Filter
      {...filter}
      key={filter.id}
      react={{
        and: [searchEntryId, ...advancedSearchIds, ...without(filterIds, filter.id)],
      }}
    />
  ));
};

const propTypes = {
  aggs: PropTypes.objectOf(PropTypes.object),
  filters: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    field: PropTypes.string,
  })),
  title: PropTypes.string,
};

const defaultProps = {
  aggs: undefined,
  filters: [],
  title: undefined,
};

export default function FilterGroup(props) {
  const {
    aggs,
    title,
    filters,
  } = props;

  const isEmpty = !aggs || !filters.find((filter) => {
    const options = get(aggs, [filter.id, filter.field, 'buckets']);

    return (options && options.length > 0);
  });

  return (
    <div className={isEmpty ? styles.empty : styles.common}>
      <h1>{title}</h1>
      {renderFilters(props)}
    </div>
  );
}

FilterGroup.propTypes = propTypes;
FilterGroup.defaultProps = defaultProps;
