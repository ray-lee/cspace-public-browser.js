import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import SearchSubmitButton from './SearchSubmitButton';
import styles from '../../../../styles/cspace/SearchQueryInput.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }).isRequired,
  onCommit: PropTypes.func,
  showSubmitButton: PropTypes.bool,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  showSubmitButton: false,
  value: '',
};

export const messages = defineMessages({
  label: {
    id: 'searchQueryInput.label',
    defaultMessage: 'Search collection',
  },
  placeholder: {
    id: 'searchQueryInput.placeholder',
    defaultMessage: 'Search collection',
  },
  shortLabel: {
    id: 'searchQueryInput.shortLabel',
    defaultMessage: 'Search',
  },
});

class SearchQueryInput extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {
      id,
      onCommit,
    } = this.props;

    onCommit(id, event.target.value);
  }

  commit() {
    const {
      id,
      onCommit,
    } = this.props;

    if (this.inputDomNode) {
      onCommit(id, this.inputDomNode.value);
    }
  }

  render() {
    const {
      id,
      intl,
      showSubmitButton,
      value,
    } = this.props;

    return (
      <div className={styles.common}>
        <input
          aria-label={intl.formatMessage(messages.label)}
          autoComplete="off"
          autoCorrect="off"
          name={id}
          placeholder={intl.formatMessage(messages.placeholder)}
          type="search"
          value={value}
          onChange={this.handleChange}
        />

        {showSubmitButton && <SearchSubmitButton />}
      </div>
    );
  }
}

SearchQueryInput.propTypes = propTypes;
SearchQueryInput.defaultProps = defaultProps;

export default injectIntl(SearchQueryInput);
