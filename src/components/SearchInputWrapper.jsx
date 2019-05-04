import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/SearchInputWrapper.css';

const propTypes = {
  selectedValue: PropTypes.string,
  setQuery: PropTypes.func,
};

const defaultProps = {
  selectedValue: undefined,
  setQuery: undefined,
};

export default class SearchInputWrapper extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value } = this.state;
    const nextValue = nextProps.selectedValue || '';

    if (nextValue !== value) {
      this.setState({
        value: nextValue,
      });

      this.updateQuery(nextValue);
    }
  }

  updateQuery(value) {
    const {
      setQuery,
    } = this.props;

    if (setQuery) {
      setQuery({
        value,
        query: DataSearch.defaultQuery(value, {
          dataField: 'all_field',
          queryFormat: 'and',
        }),
      });
    }
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    this.updateQuery(event.target.elements.fullTextSearchInput.value);
  }

  render() {
    const {
      value,
    } = this.state;

    return (
      <form
        autoComplete="off"
        className={styles.common}
        onSubmit={this.handleFormSubmit}
      >
        <input
          autoComplete="off"
          className="cspace-FullTextSearchInput"
          name="fullTextSearchInput"
          placeholder="Search materials"
          type="text"
          value={value}
          onChange={this.handleChange}
        />

        <button type="submit">
          Search
        </button>
      </form>
    );
  }
}

SearchInputWrapper.propTypes = propTypes;
SearchInputWrapper.defaultProps = defaultProps;
