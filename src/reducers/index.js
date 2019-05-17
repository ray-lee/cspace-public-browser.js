import { combineReducers } from 'redux';
import layout, * as fromLayout from './layout';
import material, * as fromMaterial from './material';
import prefs, * as fromPrefs from './prefs';

export default combineReducers({
  layout,
  material,
  prefs,
});

export const getLayoutPanelRect = (state, id) => fromLayout.getPanelRect(state.layout, id);

export const getMaterialMedia = (state, materialRefName, institutionId) => (
  fromMaterial.getMedia(state.material, materialRefName, institutionId)
);

export const getMaterialSamples = (state, materialRefName) => (
  fromMaterial.getSamples(state.material, materialRefName)
);

export const getMaterialSampleCount = (state, materialRefName, institutionId) => (
  fromMaterial.getSampleCount(state.material, materialRefName, institutionId)
);

export const getPrefs = state => state.prefs;

export const isPanelExpanded = (state, id) => fromPrefs.isPanelExpanded(state.prefs, id);
