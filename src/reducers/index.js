import { combineReducers } from 'redux';
import prefs, * as fromPrefs from './prefs';

export default combineReducers({
  prefs,
});

export const getPrefs = state => state.prefs;

export const isPanelExpanded = (state, id) =>
  fromPrefs.isPanelExpanded(state.prefs, id);
