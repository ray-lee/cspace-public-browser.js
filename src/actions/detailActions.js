import config from '../config';
import { locationToDetailParams } from '../helpers/urlHelpers';
import { getDetailParams, isDetailPending } from '../reducers';

import {
  CLEAR_DETAIL,
  DETAIL_READ_FULFILLED,
  DETAIL_READ_STARTED,
  DETAIL_READ_REJECTED,
  SET_DETAIL_PARAMS,
} from '../constants/actionCodes';

export const readDetail = () => (dispatch, getState) => {
  const params = getDetailParams(getState());

  if (!params || isDetailPending(getState())) {
    return Promise.resolve();
  }

  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');
  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;

  const payload = {
    query: {
      term: {
        'ecm:name': params.get('csid'),
      },
    },
    from: 0,
    size: 1,
  };

  dispatch({
    type: DETAIL_READ_STARTED,
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

export const clearDetail = () => {
  return {
    type: CLEAR_DETAIL,
  };
};

export const setDetailParams = (location, match) => {
  const params = locationToDetailParams(location, match);

  return {
    type: SET_DETAIL_PARAMS,
    payload: params,
  };
};
