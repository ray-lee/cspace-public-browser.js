import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../../../styles/cspace/SearchStatus.css';

const propTypes = {
  error: PropTypes.instanceOf(Error),
};

const defaultProps = {
  error: undefined,
};

export default function SearchError(props) {
  const {
    error,
  } = props;

  if (!error) {
    return undefined;
  }

  return (
    <div className={styles.common}>
      {error.message}
    </div>
  );
}

SearchError.propTypes = propTypes;
SearchError.defaultProps = defaultProps;
