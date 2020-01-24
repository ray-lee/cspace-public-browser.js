import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import SearchSubmitButton from './SearchSubmitButton';
import styles from '../../../../styles/cspace/SearchQueryInput.css';

const propTypes = {
  id: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
  onCommit: PropTypes.func,
  showSubmitButton: PropTypes.bool,
  value: PropTypes.string,
};

const defaultProps = {
  onCommit: () => undefined,
  showSubmitButton: false,
  value: undefined,
};

const messages = defineMessages({
  label: {
    id: 'searchQueryInput.label',
    defaultMessage: 'Search collection',
  },
});

class SearchQueryInput extends Component {
  constructor() {
    super();

    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputRef = this.handleInputRef.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleBlur() {
    this.commit();
  }

  handleInputRef(ref) {
    this.inputDomNode = ref;
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.commit();
    }
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

    const label = intl.formatMessage(messages.label);

    return (
      <div className={styles.common}>
        <input
          aria-label={label}
          autoComplete="off"
          autoCorrect="off"
          defaultValue={value}
          name={id}
          placeholder={label}
          ref={this.handleInputRef}
          type="search"
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
        />

        {showSubmitButton && <SearchSubmitButton />}
      </div>
    );
  }
}

SearchQueryInput.propTypes = propTypes;
SearchQueryInput.defaultProps = defaultProps;

export default injectIntl(SearchQueryInput);
