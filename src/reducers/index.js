import { combineReducers } from 'redux';
import prefs, * as fromPrefs from './prefs';

export default combineReducers({
  prefs,
});

export const getPrefs = (state, id) => state.prefs;

export const isFilterExpanded = (state, id) =>
  fromPrefs.isFilterExpanded(state.prefs, id);
