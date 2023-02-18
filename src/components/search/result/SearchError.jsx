import React from 'react';
import styles from '../../../../styles/cspace/SearchStatus.css';

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
