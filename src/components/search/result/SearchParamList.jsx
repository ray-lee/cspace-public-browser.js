import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import ClearSearchParamsLink from './ClearSearchParamsLink';
import RemoveSearchParamLink from './RemoveSearchParamLink';
import { SORT_ID } from '../../../constants/ids';
import styles from '../../../../styles/cspace/SearchParamList.css';

const propTypes = {
  params: PropTypes.instanceOf(Immutable.Map),
};

const defaultProps = {
  params: Immutable.Map(),
};

export default function SearchParamList(props) {
  const {
    params,
  } = props;

  const paramButtons = params
    .delete(SORT_ID)
    .keySeq()
    .map((id) => (
      <RemoveSearchParamLink
        id={id}
        key={id}
        params={params}
      />
    ));

  const clearButton = (params.size > 0)
    ? <ClearSearchParamsLink params={params} />
    : undefined;

  return (
    <div className={styles.common}>
      {paramButtons}
      {clearButton}
    </div>
  );
}

SearchParamList.propTypes = propTypes;
SearchParamList.defaultProps = defaultProps;
