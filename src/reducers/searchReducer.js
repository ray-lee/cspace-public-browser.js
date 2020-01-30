import Immutable from 'immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PARAMS,
} from '../constants/actionCodes';

const handleSearchFulfilled = (state, action) => {
  const {
    offset,
    pageSize,
    params: searchParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (searchParams !== currentParams) {
    return state;
  }

  const {
    responses,
  } = action.payload;

  const [
    resultResponse,
    ...filterResponses
  ] = responses;

  const {
    aggregations,
    hits,
  } = resultResponse;

  const currentResult = state.get('result') || Immutable.Map({ hits: Immutable.List() });
  const currentHits = currentResult.get('hits');

  const nextHits = currentHits.setSize(offset).concat(Immutable.fromJS(hits.hits));

  let nextResult = currentResult
    .set('total', hits.total)
    .set('hits', nextHits);

  if (offset === 0) {
    let nextAggregations = Immutable.fromJS(aggregations);

    filterResponses.forEach((filterResponse) => {
      nextAggregations = nextAggregations.merge(Immutable.fromJS(filterResponse.aggregations));
    });

    nextResult = nextResult.set('aggregations', nextAggregations);
  }

  return state
    .set('nextOffset', offset + pageSize)
    .delete('pending')
    .set('result', nextResult)
    .delete('error');
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return state
        .set('pending', true)
        .delete('error');
    case SEARCH_FULFILLED:
      return handleSearchFulfilled(state, action);
    case SEARCH_REJECTED:
      return state
        .delete('pending')
        .set('error', action.payload);
    case SET_SEARCH_PAGE_SIZE:
      return state.set('pageSize', action.payload);
    case SET_SEARCH_PARAMS:
      return state
        .delete('error')
        .delete('nextOffset')
        .set('params', action.payload)
        .delete('pending');
    default:
      return state;
  }
};

export const getError = (state) => state.get('error');
export const getNextOffset = (state) => state.get('nextOffset') || 0;
export const getPageSize = (state) => state.get('pageSize');
export const getParams = (state) => state.get('params');
export const getResult = (state) => state.get('result');

export const hasMore = (state) => {
  const result = getResult(state);

  if (!result) {
    return true;
  }

  const nextOffset = getNextOffset(state);
  const total = result.get('total');

  return (nextOffset < total);
};

export const isPending = (state) => !!state.get('pending');
