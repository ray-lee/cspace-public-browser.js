import Immutable from 'immutable';
import get from 'lodash/get';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_REJECTED,
  DETAIL_READ_STARTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

const findAdjacents = (csid, hits) => {
  // eslint-disable-next-line no-underscore-dangle
  const csidIndex = hits && hits.findIndex((hit) => hit._source['ecm:name'] === csid);

  if (csidIndex < 0) {
    return {
      prev: undefined,
      next: undefined,
    };
  }

  return {
    // eslint-disable-next-line no-underscore-dangle
    prev: (csidIndex > 0) ? hits[csidIndex - 1]._source : undefined,
    // eslint-disable-next-line no-underscore-dangle
    next: (csidIndex < hits.length - 1) ? hits[csidIndex + 1]._source : undefined,
  };
};

const handleDetailReadFulfilled = (state, action) => {
  const {
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  const response = action.payload;

  const data = get(response, ['responses', 0, 'hits', 'hits', 0, '_source']);

  const adjacents = findAdjacents(
    readParams.get('csid'),
    get(response, ['responses', 1, 'hits', 'hits']),
  );

  return state
    .set('adjacents', adjacents)
    .delete('pending')
    .set('data', data)
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
        .set('params', action.payload);
    default:
      return state;
  }
};

export const getAdjacents = (state) => state.get('adjacents');
export const getError = (state) => state.get('error');
export const getParams = (state) => state.get('params');
export const getData = (state) => state.get('data');
export const isPending = (state) => !!state.get('pending');
