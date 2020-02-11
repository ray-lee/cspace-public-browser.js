/* global fetch */

import get from 'lodash/get';
import { getItemShortID } from 'cspace-refname';
import config from '../config';
import { getMedia } from '../reducers';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

export const setMedia = (refName, institutionId, mediaCsids) => ({
  type: SET_MEDIA,
  payload: mediaCsids,
  meta: {
    institutionId,
    refName,
  },
});

export const findMedia = (refName, institutionId) => (dispatch, getState) => {
  if (getMedia(getState(), refName, institutionId)) {
    return Promise.resolve();
  }

  let gatewayUrl;
  let indexName;

  if (institutionId === null) {
    gatewayUrl = config.get('gatewayUrl');
    indexName = config.get('esIndexName');
  } else {
    gatewayUrl = config.get(['institutions', institutionId, 'gatewayUrl']);
    indexName = config.get(['institutions', institutionId, 'esIndexName']);
  }

  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;
  const shortId = getItemShortID(refName) || refName;

  const query = {
    _source: 'collectionspace_denorm:mediaCsid',
    query: {
      term: {
        'materials_common:shortIdentifier': shortId,
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

      return dispatch(setMedia(refName, institutionId, mediaCsids));
    });
};
