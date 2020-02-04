import Immutable from 'immutable';
import get from 'lodash/get';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_REJECTED,
  DETAIL_READ_STARTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

const handleDetailReadFulfilled = (state, action) => {
  const {
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  const response = action.payload;

  return state
    .delete('pending')
    .set('data', get(response, ['hits', 'hits', 0, '_source']))
    .delete('error');
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CLEAR_DETAIL:
        return state.clear();
    case DETAIL_READ_STARTED:
      return state
        .set('pending', true)
        .delete('error');
    case DETAIL_READ_FULFILLED:
      return handleDetailReadFulfilled(state, action);
    case DETAIL_READ_REJECTED:
      return state
        .delete('pending')
        .set('error', action.payload);
    case SET_DETAIL_PARAMS:
      return state
        .set('params', action.payload)
    default:
      return state;
  }
};

export const getError = (state) => state.get('error');
export const getParams = (state) => state.get('params');
export const getData = (state) => state.get('data');
export const isPending = (state) => !!state.get('pending');
