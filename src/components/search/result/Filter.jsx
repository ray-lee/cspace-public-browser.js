import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import FilterSearchInput from './FilterSearchInput';
import Panel from '../../layout/PanelContainer';
import { paramsToQueryString } from '../../../helpers/urlHelpers';
import styles from '../../../../styles/cspace/Filter.css';
import linkStyles from '../../../../styles/cspace/FilterLink.css';

const propTypes = {
  aggregation: PropTypes.instanceOf(Immutable.Map),
  field: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  messages: PropTypes.shape({
    label: PropTypes.object.isRequired,
  }).isRequired,
  onSearchValueCommit: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  searchValue: PropTypes.string,
};

const defaultProps = {
  aggregation: Immutable.Map(),
  onSearchValueCommit: () => undefined,
  searchValue: undefined,
};

const messages = defineMessages({
  count: {
    id: 'filter.count',
    defaultMessage: '({count, number})',
  }
});

export default class Filter extends Component {
  constructor() {
    super();

    this.handleSearchInputCommit = this.handleSearchInputCommit.bind(this);
  }

  handleSearchInputCommit(value) {
    const {
      id,
      onSearchValueCommit,
    } = this.props;

    onSearchValueCommit(id, value);
  }

  renderBuckets() {
    const {
      aggregation,
      id,
      params,
      searchValue,
    } = this.props;

    const buckets = aggregation.get('buckets');

    let matchingBuckets = buckets;

    if (searchValue) {
      const needle = searchValue.toLowerCase();

      matchingBuckets = buckets.filter((bucket) => {
        const haystack = bucket.get('key').toLowerCase();

        return haystack.includes(needle);
      });
    }

    let selectedValues = params.get(id) || Immutable.List();

    if (!Immutable.List.isList(selectedValues)) {
      selectedValues = Immutable.List.of(selectedValues);
    }

    return matchingBuckets.map((bucket) => {
      const key = bucket.get('key');
      const count = bucket.get('doc_count');

      const selectedIndex = selectedValues.indexOf(key);
      const isSelected = (selectedIndex >= 0);

      let linkParams;

      if (isSelected) {
        linkParams = (selectedValues.size > 1)
          ? params.set(id, selectedValues.delete(selectedIndex))
          : params.delete(id);
      } else {
        linkParams = params.set(id, selectedValues.push(key));
      }

      const queryString = paramsToQueryString(linkParams);

      return (
        <li key={key}>
          <Link
            className={isSelected ? linkStyles.selected : linkStyles.common}
            to={{ search: `?${queryString}` }}
          >
            <span>{key}</span>
            {' '}
            <FormattedMessage {...messages.count} values={{ count }} />
          </Link>
        </li>
      )
    });
  }

  render() {
    const {
      aggregation,
      id,
      messages,
      searchValue,
    } = this.props;

    const buckets = aggregation.get('buckets');
    const isEmpty = !buckets || buckets.size === 0;

    if (isEmpty) {
      return null;
    }

    const title = <FormattedMessage {...messages.label} />;

    return (
      <Panel id={`Filter-${id}`} title={title}>
        <div className={styles.common}>
          <FilterSearchInput
            value={searchValue}
            onCommit={this.handleSearchInputCommit}
          />
          <ul>
            {this.renderBuckets(buckets)}
          </ul>
        </div>
      </Panel>
    );
  }
}

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;
