import Immutable from 'immutable';
import qs from 'qs';
import config from '../config';
import { getSort, getQuery } from '../helpers/esQueryHelpers';

import {
  getSearchPageSize,
  getSearchParams,
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
  const queryString = qs.stringify(
    params
      .map((value) => (value && JSON.stringify(value)))
      .filter((value) => !!value)
      .toJS(),
    { format: 'RFC1738' },
  );

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

  if (!params) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');
  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;

  const payload = {
    query: getQuery(params.delete('sort')),
    from: 0,
    size: getSearchPageSize(getState()) || 15,
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
          params,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_REJECTED,
        payload: error,
        meta: {
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
  const params = Immutable.Map(qs.parse(location.search, { ignoreQueryPrefix: true }))
    .filter((value) => !!value)
    .map((value) => JSON.parse(value));

  return {
    type: SET_SEARCH_PARAMS,
    payload: params,
  };
};

export const applySortOrder = (history, sortOrder) => (dispatch, getState) => (
  dispatch(openSearch(history, getSearchParams(getState()).set('sort', sortOrder)))
);
