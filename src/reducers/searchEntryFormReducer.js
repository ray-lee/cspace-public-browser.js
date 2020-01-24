import Immutable from 'immutable';

import {
  SET_SEARCH_ENTRY_FORM_PARAM,
  SET_SEARCH_PARAMS,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_SEARCH_PARAMS:
      return state.set('params', action.payload);
    case SET_SEARCH_ENTRY_FORM_PARAM:
      return state.setIn(['params', action.meta.id], action.payload);
    default:
      return state;
  }
};

export const getParams = (state) => state.get('params');
