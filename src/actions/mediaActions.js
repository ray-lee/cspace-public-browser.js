/* global fetch */

import get from 'lodash/get';
import config from '../config';
import { getMedia } from '../reducers';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

export const setMedia = (referenceValue, institutionId, mediaCsids) => ({
  type: SET_MEDIA,
  payload: mediaCsids,
  meta: {
    institutionId,
    referenceValue,
  },
});

export const findMedia = (referenceValue, institutionId) => (dispatch, getState) => {
  if (getMedia(getState(), referenceValue, institutionId)) {
    return Promise.resolve();
  }

  let gatewayUrl;

  if (institutionId === null) {
    gatewayUrl = config.get('gatewayUrl');
  } else {
    gatewayUrl = config.get(['institutions', institutionId, 'gatewayUrl']);
  }

  const url = `${gatewayUrl}/es/doc/_search`;
  const referenceField = config.get('referenceField');

  const query = {
    _source: 'collectionspace_denorm:mediaCsid',
    query: {
      term: {
        [referenceField]: referenceValue,
      },
    },
    size: 1,
    terminate_after: 1,
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then((response) => response.json())
    .then((data) => {
      const mediaCsids = get(data, ['hits', 'hits', 0, '_source', 'collectionspace_denorm:mediaCsid']) || [];

      return dispatch(setMedia(referenceValue, institutionId, mediaCsids));
    });
};
