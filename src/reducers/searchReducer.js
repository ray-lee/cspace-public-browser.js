import Immutable from 'immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PARAMS,
  SET_SEARCH_SORT_ORDER,
} from '../constants/actionCodes';

const handleSearchFulfilled = (state, action) => {
  const {
    params: searchParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (searchParams !== currentParams) {
    return state;
  }

  // const {
  //   hits,
  // } = action.payload;

  // let result = state.get('result') || Immutable.Map();

  // result = result.set('total', hits.total);
  // result = result.set('hits', hits.hits);

  return state
    .delete('pending')
    .set('result', Immutable.fromJS(action.payload))
    .delete('error');
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return state
        .set('pending', true)
        .delete('result')
        .delete('error');
    case SEARCH_FULFILLED:
      return handleSearchFulfilled(state, action);
    case SEARCH_REJECTED:
      return state
        .delete('pending')
        .delete('result')
        .set('error', action.payload);
    case SET_SEARCH_PAGE_SIZE:
      return state.set('pageSize', action.payload);
    case SET_SEARCH_PARAMS:
      return state.set('params', action.payload);
    default:
      return state;
  }
};

export const getError = (state) => state.get('error');
export const getPageSize = (state) => state.get('pageSize');
export const getParams = (state) => state.get('params');
export const getResult = (state) => state.get('result');
export const isPending = (state) => !!state.get('pending');
