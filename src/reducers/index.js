import { combineReducers } from 'redux';
import material, * as fromMaterial from './material';
import prefs, * as fromPrefs from './prefs';

export default combineReducers({
  material,
  prefs,
});

export const getMaterialSamples = (state, material, institutionId) =>
  fromMaterial.getSamples(state.material, material);

export const getMaterialSampleCount = (state, material, institutionId) =>
  fromMaterial.getSampleCount(state.material, material, institutionId);

export const getPrefs = state => state.prefs;

export const isPanelExpanded = (state, id) =>
  fromPrefs.isPanelExpanded(state.prefs, id);
