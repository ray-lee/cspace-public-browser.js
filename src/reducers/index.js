import { combineReducers } from 'redux';
import layout, * as fromLayout from './layout';
import material, * as fromMaterial from './material';
import prefs, * as fromPrefs from './prefs';
import search, * as fromSearch from './searchReducer';
import searchEntryForm, * as fromSearchEntryForm from './searchEntryFormReducer';
import searchPage, * as fromSearchPage from './searchPageReducer';

export default combineReducers({
  layout,
  material,
  prefs,
  search,
  searchEntryForm,
  searchPage,
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

export const getPrefs = (state) => state.prefs;
export const isPanelExpanded = (state, id) => fromPrefs.isPanelExpanded(state.prefs, id);

export const getSearchError = (state) => fromSearch.getError(state.search);
export const getSearchResult = (state) => fromSearch.getResult(state.search);
export const isSearchPending = (state) => fromSearch.isPending(state.search);

export const getSearchEntryFormParams = (state) => (
  fromSearchEntryForm.getParams(state.searchEntryForm)
);

export const getSearchPageParams = (state) => fromSearchPage.getParams(state.searchPage);
