import {
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

export default {};
