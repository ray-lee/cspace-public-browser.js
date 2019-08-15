/* global fetch */

import get from 'lodash/get';
import { getItemShortID } from 'cspace-refname';
import config from '../config';
import { getMaterialMedia } from '../reducers';

import {
  SET_MATERIAL_MEDIA,
  SET_MATERIAL_SAMPLE_COUNT,
} from '../constants/actionCodes';

export const setMaterialSampleCount = (material, institutionId, sampleCount) => ({
  type: SET_MATERIAL_SAMPLE_COUNT,
  payload: sampleCount,
  meta: {
    material,
    institutionId,
  },
});

export const setMaterialMedia = (materialRefName, institutionId, mediaCsids) => ({
  type: SET_MATERIAL_MEDIA,
  payload: mediaCsids,
  meta: {
    institutionId,
    material: materialRefName,
  },
});

export const findMaterialMedia = (materialRefName, institutionId) => (dispatch, getState) => {
  if (getMaterialMedia(getState(), materialRefName, institutionId)) {
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

  const url = `${gatewayUrl}/es/${indexName}/doc/_search?size=1&terminate_after=1`;
  const materialShortID = getItemShortID(materialRefName) || materialRefName;

  const query = {
    _source: 'collectionspace_denorm:mediaCsid',
    query: {
      term: { 'materials_common:shortIdentifier': materialShortID },
    },
  };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(query),
  })
    .then(response => response.json())
    .then((data) => {
      const mediaCsids = get(data, ['hits', 'hits', 0, '_source', 'collectionspace_denorm:mediaCsid']) || [];

      return dispatch(setMaterialMedia(materialRefName, institutionId, mediaCsids));
    });
};

export const findMaterialPrevNext = (query, index, csid) => {
  const gatewayUrl = config.get('gatewayUrl');
  const indexName = config.get('esIndexName');

  const url = `${gatewayUrl}/es/${indexName}/doc/_search`;

  const navQuery = Object.assign({}, query, {
    from: Math.max(0, index - 1),
    size: 3,
  });

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(navQuery),
  })
    .then(response => response.json())
    .then((data) => {
      const { hits } = data.hits;
      // eslint-disable-next-line no-underscore-dangle
      const csidIndex = hits.findIndex(hit => hit._source['ecm:name'] === csid);

      if (csidIndex < 0) {
        return {
          prev: undefined,
          next: undefined,
        };
      }

      return {
        prev: (csidIndex > 0) ? hits[csidIndex - 1] : undefined,
        next: (csidIndex < hits.length - 1) ? hits[csidIndex + 1] : undefined,
      };
    });
};
