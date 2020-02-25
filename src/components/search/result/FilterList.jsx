import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import FilterGroup from './FilterGroup';

const propTypes = {
  config: PropTypes.shape({
    fields: PropTypes.object.isRequired,
    groups: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
  }).isRequired,
  isPending: PropTypes.bool,
  aggregations: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  aggregations: Immutable.Map(),
  isPending: PropTypes.bool,
};

export default function FilterList(props) {
  const {
    aggregations,
    config,
    isPending,
  } = props;

  const {
    fields,
    groups,
    layout,
  } = config;

  return Object.keys(layout).map((layoutId) => (
    <div key={layoutId}>
      {layout[layoutId].map((groupId) => (
        <FilterGroup
          aggregations={aggregations}
          config={groups[groupId]}
          fieldsConfig={fields}
          id={groupId}
          isPending={isPending}
          key={groupId}
        />
      ))}
    </div>
  ));
}

FilterList.propTypes = propTypes;
FilterList.defaultProps = defaultProps;
