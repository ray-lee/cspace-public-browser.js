import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import FilterSearchInput from './FilterSearchInput';
import Panel from '../../layout/PanelContainer';
import styles from '../../../../styles/cspace/Filter.css';

const propTypes = {
  aggregation: PropTypes.instanceOf(Immutable.Map),
  field: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  messages: PropTypes.shape({
    label: PropTypes.object.isRequired,
  }).isRequired,
  onSearchValueCommit: PropTypes.func,
  onValueCommit: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map).isRequired,
  searchValue: PropTypes.string,
};

const defaultProps = {
  aggregation: Immutable.Map(),
  onSearchValueCommit: () => undefined,
  onValueCommit: () => undefined,
  searchValue: undefined,
};

const messages = defineMessages({
  count: {
    id: 'filter.count',
    defaultMessage: '({count, number})',
  },
});

class Filter extends Component {
  constructor() {
    super();

    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleSearchInputCommit = this.handleSearchInputCommit.bind(this);
  }

  handleSearchInputCommit(value) {
    const {
      id,
      onSearchValueCommit,
    } = this.props;

    onSearchValueCommit(id, value);
  }

  handleCheckboxChange(event) {
    const {
      history,
      id,
      onValueCommit,
    } = this.props;

    const {
      target: checkbox,
    } = event;

    onValueCommit(history, id, checkbox.name, checkbox.checked);
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
      const isSelected = (selectedValues.indexOf(key) >= 0);

      return (
        <li key={key}>
          <label>
            <input
              checked={isSelected}
              name={key}
              type="checkbox"
              onChange={this.handleCheckboxChange}
            />

            <div>
              <span>
                {key}
                {' '}
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <FormattedMessage {...messages.count} values={{ count }} />
              </span>
            </div>
          </label>
        </li>
      );
    });
  }

  render() {
    const {
      aggregation,
      id,
      messages: filterMessages,
      searchValue,
    } = this.props;

    const buckets = aggregation.get('buckets');
    const isEmpty = !buckets || buckets.size === 0;

    if (isEmpty) {
      return null;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    const title = <FormattedMessage {...filterMessages.label} />;

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

export default withRouter(Filter);
