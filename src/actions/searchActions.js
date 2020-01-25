import Immutable from 'immutable';
import qs from 'qs';
import config from '../config';
import { createQuery } from '../helpers/esQueryHelpers';

import {
  OPEN_SEARCH,
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
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

export const search = (params) => (dispatch) => {
  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');
  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;

  const payload = {
    query: createQuery(params),
    from: 0,
    size: 10,
    _source: {
      includes: config.get('includeFields'),
    },
    sort: [
      {
        'collectionspace_core:createdAt': {
          order: 'desc',
        },
      },
    ],
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
      });
    })
    .catch((error) => {
      dispatch({
        type: SEARCH_REJECTED,
        payload: error,
      });
    });
};
