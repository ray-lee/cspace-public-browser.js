import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Immutable from 'immutable';
import Filter from './FilterContainer';
import styles from '../../../../styles/cspace/FilterGroup.css';

const propTypes = {
  config: PropTypes.shape({
    id: PropTypes.string.isRequired,
    filters: PropTypes.arrayOf(PropTypes.object).isRequired,
    messages: PropTypes.object,
    title: PropTypes.string,
  }).isRequired,
  isPending: PropTypes.bool,
  aggregations: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  isPending: false,
  aggregations: Immutable.Map(),
};

export default function FilterGroup(props) {
  const {
    config,
    aggregations,
  } = props;

  const {
    id,
    title,
    filters,
    messages,
  } = config;

  const isEmpty = aggregations.isEmpty() || !filters.find(({ id: filterId }) => {
    const buckets = aggregations.getIn([filterId, 'buckets']);

    return (buckets && buckets.size > 0);
  });

  if (isEmpty) {
    return null;
  }

  const titleMessage = messages && messages.title;

  // eslint-disable-next-line react/jsx-props-no-spreading
  const headerContent = (titleMessage ? <FormattedMessage {...titleMessage} /> : title) || id;

  return (
    <div className={styles.common}>
      <h1>{headerContent}</h1>
      {
        filters.map(({ field, id: filterId, messages: filterMessages }) => (
          <Filter
            aggregation={aggregations.get(filterId)}
            id={filterId}
            field={field}
            key={filterId}
            messages={filterMessages}
          />
        ))
      }
    </div>
  );
}

FilterGroup.propTypes = propTypes;
FilterGroup.defaultProps = defaultProps;
