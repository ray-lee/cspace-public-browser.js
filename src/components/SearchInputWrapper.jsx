import React, { Component } from 'react';
import { DataSearch } from '@appbaseio/reactivesearch';
import searchIcon from '../../images/search.svg';
import styles from '../../styles/cspace/SearchInputWrapper.css';

export default class SearchInputWrapper extends Component {
  constructor() {
    super();

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: '',
    };
  }

  updateQuery(value) {
    const {
      setQuery,
    } = this.props;

    setQuery({
      value,
      query: DataSearch.defaultQuery(value, {
        dataField: '_all',
        queryFormat: 'and',
      }),
    });
  }

  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.selectedValue || '';

    if (nextValue !== this.state.value) {
      this.setState({
        value: nextValue,
      });

      this.updateQuery(nextValue);
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
          <img alt="Search" src={searchIcon} />
        </button>
      </form>
    );
  }
}
