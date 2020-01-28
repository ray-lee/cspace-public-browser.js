/* global fetch */

import Immutable from 'immutable';
import config from '../config';
import { getSort, getQuery } from '../helpers/esQueryHelpers';
import { SORT_ID } from '../constants/ids';
import { paramsToQueryString, queryStringToParams } from '../helpers/urlHelpers';

import {
  getSearchNextOffset,
  getSearchPageSize,
  getSearchParams,
  isSearchPending,
  searchHasMore,
} from '../reducers';

import {
  OPEN_SEARCH,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
  SET_SEARCH_PAGE_SIZE,
  SET_SEARCH_PARAMS,
} from '../constants/actionCodes';

export const openSearch = (history, params = Immutable.Map()) => {
  const queryString = paramsToQueryString(params);

  history.push({
    search: `?${queryString}`,
  });

  return {
    type: OPEN_SEARCH,
    payload: queryString,
  };
};

export const search = () => (dispatch, getState) => {
  const params = getSearchParams(getState());

  if (!params || isSearchPending(getState()) || !searchHasMore(getState())) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');
  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;

  const offset = getSearchNextOffset(getState()) || 0;
  const pageSize = getSearchPageSize(getState()) || 15;

  const payload = {
    query: getQuery(params.delete(SORT_ID)),
    from: offset,
    size: pageSize,
    _source: {
      includes: config.get('includeFields'),
    },
    sort: getSort(params),
  };

  dispatch({
    type: SEARCH_STARTED,
  });

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        const error = new Error();

        error.response = response;

        return Promise.reject(error);
      }

      return response.json();
    })
    .then((data) => {
      dispatch({
        type: SEARCH_FULFILLED,
        payload: data,
        meta: {
          offset,
          pageSize,
          params,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_REJECTED,
        payload: error,
        meta: {
          offset,
          pageSize,
          params,
        },
      });
    });
};

export const setSearchPageSize = (pageSize) => ({
  type: SET_SEARCH_PAGE_SIZE,
  payload: pageSize,
});

export const setSearchParams = (location) => {
  const params = queryStringToParams(location.search);

  return {
    type: SET_SEARCH_PARAMS,
    payload: params,
  };
};

export const applySortOrder = (history, sortOrder) => (dispatch, getState) => (
  dispatch(openSearch(history, getSearchParams(getState()).set(SORT_ID, sortOrder)))
);
