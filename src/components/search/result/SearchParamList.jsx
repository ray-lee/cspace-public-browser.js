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

  const removableParams = params.delete(SORT_ID);

  if (removableParams.size === 0) {
    return null;
  }

  const paramButtons = removableParams
    .keySeq()
    .map((id) => (
      <RemoveSearchParamLink
        id={id}
        key={id}
        params={params}
      />
    ));

  return (
    <div className={styles.common}>
      {paramButtons}
      <ClearSearchParamsLink params={params} />
    </div>
  );
}

SearchParamList.propTypes = propTypes;
SearchParamList.defaultProps = defaultProps;
