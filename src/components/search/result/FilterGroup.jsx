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
    title,
    filters,
    messages,
  } = config;

  const isEmpty = aggregations.isEmpty() || !filters.find(({ id }) => {
    const buckets = aggregations.getIn([id, 'buckets']);

    return (buckets && buckets.size > 0);
  });

  if (isEmpty) {
    return null;
  }

  const titleMessage = messages && messages.title;
  const headerContent = (titleMessage ? <FormattedMessage {...titleMessage} /> : title) || id;

  return (
    <div className={styles.common}>
      <h1>{headerContent}</h1>
      {
        filters.map(({ id, field, messages }) => (
          <Filter
            aggregation={aggregations.get(id)}
            id={id}
            field={field}
            key={id}
            messages={messages}
          />
        ))
      }
    </div>
  );
}

FilterGroup.propTypes = propTypes;
FilterGroup.defaultProps = defaultProps;
