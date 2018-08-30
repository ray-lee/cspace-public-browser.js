import Immutable from 'immutable';

import {
  PREFS_LOADED,
  EXPAND_FILTER,
  TOGGLE_FILTER,
} from '../constants/actionCodes';

const setFilterExpanded = (state, id, expanded) =>
  state.setIn(['filters', id, 'expand'], expanded);

export const isFilterExpanded = (state, id) => state.getIn(['filters', id, 'expand']);

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case PREFS_LOADED:
      return (action.payload ? Immutable.fromJS(action.payload) : Immutable.Map());
    case EXPAND_FILTER:
      return setFilterExpanded(state, action.meta.id, action.payload);
    case TOGGLE_FILTER:
      return setFilterExpanded(state, action.meta.id, !isFilterExpanded(state, action.meta.id));
  default:
      return state;
  }
};
