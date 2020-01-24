import { openSearch } from './searchActions';
import { getSearchEntryFormParams } from '../reducers';
import { SET_SEARCH_ENTRY_FORM_PARAM } from '../constants/actionCodes';

export const setSearchEntryFormParam = (id, value) => ({
  type: SET_SEARCH_ENTRY_FORM_PARAM,
  payload: value,
  meta: {
    id,
  },
});

export const applySearchEntryForm = (history) => (dispatch, getState) => (
  dispatch(openSearch(history, getSearchEntryFormParams(getState())))
);
