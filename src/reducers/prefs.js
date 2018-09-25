import Immutable from 'immutable';

import {
  PREFS_LOADED,
  EXPAND_PANEL,
  TOGGLE_PANEL,
} from '../constants/actionCodes';

const setPanelExpanded = (state, id, expanded) =>
  state.setIn(['panels', id, 'expand'], expanded);

export const isPanelExpanded = (state, id) => state.getIn(['panels', id, 'expand']);

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PREFS_LOADED:
      return (action.payload ? Immutable.fromJS(action.payload) : Immutable.Map());
    case EXPAND_PANEL:
      return setPanelExpanded(state, action.meta.id, action.payload);
    case TOGGLE_PANEL:
      return setPanelExpanded(state, action.meta.id, !isPanelExpanded(state, action.meta.id));
    default:
      return state;
  }
};
