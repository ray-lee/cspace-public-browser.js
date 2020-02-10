import Immutable from 'immutable';
import get from 'lodash/get';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_REJECTED,
  DETAIL_READ_STARTED,
  INST_SEARCH_FULFILLED,
  INST_SEARCH_REJECTED,
  INST_SEARCH_STARTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

const findAdjacents = (csid, hits) => {
  // eslint-disable-next-line no-underscore-dangle
  const csidIndex = hits ? hits.findIndex((hit) => hit._source['ecm:name'] === csid) : -1;

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

const handleDetailReadStarted = (state, action) => {
  const {
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  return state
    .set('pending', true)
    .delete('error');
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

const handleDetailReadRejected = (state, action) => {
  const {
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  return state
    .delete('pending')
    .set('error', action.payload);
};

const handleInstSearchStarted = (state, action) => {
  const {
    institutionId,
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  return state
    .setIn(['inst', institutionId, 'pending'], true)
    .deleteIn(['inst', institutionId, 'error']);
};

const handleInstSearchFulfilled = (state, action) => {
  const {
    institutionId,
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  const response = action.payload;

  const hits = get(response, ['hits', 'hits']);

  return state
    .deleteIn(['inst', institutionId, 'pending'])
    .setIn(['inst', institutionId, 'hits'], hits)
    .deleteIn(['inst', institutionId, 'error']);
};

const handleInstSearchRejected = (state, action) => {
  const {
    institutionId,
    params: readParams,
  } = action.meta;

  const currentParams = state.get('params');

  if (readParams !== currentParams) {
    return state;
  }

  return state
    .deleteIn(['inst', institutionId, 'pending'])
    .setIn(['inst', institutionId, 'error'], action.payload);
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case CLEAR_DETAIL:
      return state.clear();
    case DETAIL_READ_STARTED:
      return handleDetailReadStarted(state, action);
    case DETAIL_READ_FULFILLED:
      return handleDetailReadFulfilled(state, action);
    case DETAIL_READ_REJECTED:
      return handleDetailReadRejected(state, action);
    case INST_SEARCH_STARTED:
      return handleInstSearchStarted(state, action);
    case INST_SEARCH_FULFILLED:
      return handleInstSearchFulfilled(state, action);
    case INST_SEARCH_REJECTED:
      return handleInstSearchRejected(state, action);
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

export const getHoldingInstitutions = (state) => {
  const inst =  state.get('inst');

  if (!inst) {
    return Immutable.Set();
  }

  const institutionIds = inst.keySeq().filter((institutionId) => {
    const hits = inst.getIn([institutionId, 'hits']);

    return (hits && hits.length > 0);
  });

  return Immutable.Set(institutionIds);
};

export const getInstitutionHits = (state, institutionId) => (
  state.getIn(['inst', institutionId, 'hits'])
);
