import Immutable from 'immutable';
import { getItemShortID } from 'cspace-refname';

import {
  SET_MATERIAL_SAMPLE_COUNT,
} from '../constants/actionCodes';

const setSampleCount = (state, action) => {
  const sampleCount = action.payload;

  const {
    material,
    institutionId,
  } = action.meta;

  const shortId = getItemShortID(material) || material;

  return state.setIn([shortId, 'samples', institutionId, 'count'], sampleCount);
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_MATERIAL_SAMPLE_COUNT:
      return setSampleCount(state, action);
    default:
      return state;
  }
};

export const getSamples = (state, materialRefName) => {
  const shortId = getItemShortID(materialRefName) || materialRefName;

  return state.getIn([shortId, 'samples']);
};

export const getSampleCount = (state, materialRefName, institutionId) => {
  const shortId = getItemShortID(materialRefName) || materialRefName;

  return state.getIn([shortId, 'samples', institutionId, 'count']);
};
