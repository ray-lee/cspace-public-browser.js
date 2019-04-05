import React from 'react';
import PropTypes from 'prop-types';
import { DataSearch } from '@appbaseio/reactivesearch';
import styles from '../../styles/cspace/AdvancedSearchInput.css';

const propTypes = {
  autoSuggest: PropTypes.bool,
  id: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const defaultProps = {
  autoSuggest: false,
};

export default function AdvancedSearchInput(props) {
  const {
    autoSuggest,
    id,
    field,
    title,
  } = props;

  return (
    /* eslint-disable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
    <label className={styles.common}>
      <span>{title}</span>
      <DataSearch
        autosuggest={autoSuggest}
        componentId={id}
        dataField={field}
        filterLabel={title}
        innerClass={{
          input: 'cspace-SearchInput',
          title: 'cspace-SearchInputTitle',
        }}
        showIcon={false}
        placeholder=""
        debounce={500}
        URLParams
      />
    </label>
    /* eslint-enable jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */
  );
}

AdvancedSearchInput.propTypes = propTypes;
AdvancedSearchInput.defaultProps = defaultProps;
