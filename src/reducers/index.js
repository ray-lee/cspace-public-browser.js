import { combineReducers } from 'redux';
import layout, * as fromLayout from './layout';
import material, * as fromMaterial from './material';
import prefs, * as fromPrefs from './prefs';

export default combineReducers({
  layout,
  material,
  prefs,
});

export const getLayoutPanelRect = (state, id) =>
  fromLayout.getPanelRect(state.layout, id);

export const getMaterialSamples = (state, material) =>
  fromMaterial.getSamples(state.material, material);

export const getMaterialSampleCount = (state, material, institutionId) =>
  fromMaterial.getSampleCount(state.material, material, institutionId);

export const getPrefs = state =>
  state.prefs;

export const isPanelExpanded = (state, id) =>
  fromPrefs.isPanelExpanded(state.prefs, id);
