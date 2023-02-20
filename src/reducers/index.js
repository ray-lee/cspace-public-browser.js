import { combineReducers } from 'redux';
import detail, * as fromDetail from './detailReducer';
import filter, * as fromFilter from './filterReducer';
import media, * as fromMedia from './mediaReducer';
import prefs, * as fromPrefs from './prefsReducer';
import search, * as fromSearch from './searchReducer';
import searchEntryForm, * as fromSearchEntryForm from './searchEntryFormReducer';

export default combineReducers({
  detail,
  filter,
  media,
  prefs,
  search,
  searchEntryForm,
});

export const getDetailAdjacents = (state) => fromDetail.getAdjacents(state.detail);
export const getDetailError = (state) => fromDetail.getError(state.detail);
export const getDetailParams = (state) => fromDetail.getParams(state.detail);
export const getDetailData = (state) => fromDetail.getData(state.detail);
export const isDetailPending = (state) => fromDetail.isPending(state.detail);

export const getDetailHoldingInstitutions = (state) => (
  fromDetail.getHoldingInstitutions(state.detail)
);

export const getDetailInstitutionHits = (state, institutionId) => (
  fromDetail.getInstitutionHits(state.detail, institutionId)
);

export const isDetailInstSearchPending = (state, institutionId) => (
  fromDetail.isInstSearchPending(state.detail, institutionId)
);

export const getFilterSearchValue = (state, id) => fromFilter.getSearchValue(state.filter, id);

export const getMedia = (state, referenceValue, institutionId) => (
  fromMedia.get(state.media, referenceValue, institutionId)
);

export const getPrefs = (state) => state.prefs;
export const isPanelExpanded = (state, id) => fromPrefs.isPanelExpanded(state.prefs, id);

export const getSearchError = (state) => fromSearch.getError(state.search);
export const getSearchOffset = (state) => fromSearch.getOffset(state.search);
export const getSearchNextOffset = (state) => fromSearch.getNextOffset(state.search);
export const getSearchPageSize = (state) => fromSearch.getPageSize(state.search);
export const getSearchParams = (state) => fromSearch.getParams(state.search);
export const getSearchResult = (state) => fromSearch.getResult(state.search);
export const isSearchPending = (state) => fromSearch.isPending(state.search);
export const searchHasMore = (state) => fromSearch.hasMore(state.search);

export const getSearchEntryFormParams = (state) => (
  fromSearchEntryForm.getParams(state.searchEntryForm)
);
