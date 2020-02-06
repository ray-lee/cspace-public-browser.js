/* global fetch */

import config from '../config';
import { locationToDetailParams } from '../helpers/urlHelpers';

import {
  getDetailParams,
  isDetailPending,
} from '../reducers';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_STARTED,
  DETAIL_READ_REJECTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

import {
  getSearchResultPayload,
} from '../helpers/esQueryHelpers';

export const readDetail = () => (dispatch, getState) => {
  const params = getDetailParams(getState());

  if (!params || isDetailPending(getState())) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');
  const url = `${gatewayUrl}/es/${indexName}/doc/_msearch`;

  const csid = params.get('csid');
  const index = params.get('index');
  const searchParams = params.get('searchParams');

  const detailPayload = {
    query: {
      term: {
        'ecm:name': csid,
      },
    },
    from: 0,
    size: 1,
  };

  const bodyParts = [
    JSON.stringify({ preference: 'detail' }),
    JSON.stringify(detailPayload),
  ];

  if (searchParams && typeof index !== 'undefined') {
    const adjacentResultsPayload = getSearchResultPayload(
      searchParams,
      3,
      Math.max(0, index - 1),
    );

    bodyParts.push(JSON.stringify({ preference: 'adjacent' }));
    bodyParts.push(JSON.stringify(adjacentResultsPayload));
  }

  dispatch({
    type: DETAIL_READ_STARTED,
  });

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-ndjson' },
    body: bodyParts.join('\n'),
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
        type: DETAIL_READ_FULFILLED,
        payload: data,
        meta: {
          params,
        },
      });
    })
    .catch((error) => {
      dispatch({
        type: DETAIL_READ_REJECTED,
        payload: error,
        meta: {
          params,
        },
      });
    });
};

export const clearDetail = () => ({
  type: CLEAR_DETAIL,
});

export const setDetailParams = (location, match) => {
  const params = locationToDetailParams(location, match);

  return {
    type: SET_DETAIL_PARAMS,
    payload: params,
  };
};
