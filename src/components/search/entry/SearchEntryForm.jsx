import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Immutable from 'immutable';
import SearchQueryInput from './SearchQueryInput';
import { SEARCH_QUERY_ID } from '../../../constants/ids';
import styles from '../../../../styles/cspace/SearchEntryForm.css';

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  onCommit: PropTypes.func,
  onSubmit: PropTypes.func,
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  onCommit: () => undefined,
  onSubmit: () => undefined,
  params: Immutable.Map(),
};

class SearchEntryForm extends Component {
  constructor() {
    super();

    this.handleInputCommit = this.handleInputCommit.bind(this);
    this.handleRef = this.handleRef.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputCommit(id, value) {
    const {
      onCommit,
    } = this.props;

    onCommit(id, value);
  }

  handleRef(ref) {
    this.domNode = ref;
  }

  handleSubmit(event) {
    const {
      history,
      onSubmit,
    } = this.props;

    event.preventDefault();

    onSubmit(history);
  }

  render() {
    const {
      params,
    } = this.props;

    return (
      <form
        className={styles.common}
        ref={this.handleRef}
        role="search"
        onSubmit={this.handleSubmit}
      >
        <SearchQueryInput
          id={SEARCH_QUERY_ID}
          showSubmitButton
          value={params.get(SEARCH_QUERY_ID)}
          onCommit={this.handleInputCommit}
        />
      </form>
    );
  }
}

SearchEntryForm.propTypes = propTypes;
SearchEntryForm.defaultProps = defaultProps;

export default withRouter(SearchEntryForm);
