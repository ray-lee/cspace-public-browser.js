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
    console.log('already have ' + institutionId);
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

  const url = gatewayUrl + '/es/' + indexName + '/doc/_search?size=1&terminate_after=1';

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
    .then(data => {
      const mediaCsids = data.hits.hits[0]._source['collectionspace_denorm:mediaCsid'];

      return dispatch(setMaterialMedia(materialRefName, institutionId, mediaCsids));
    });
};
