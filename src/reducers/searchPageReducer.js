import Immutable from 'immutable';

import {
  SET_SEARCH_PAGE_PARAMS,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_SEARCH_PAGE_PARAMS:
      return state.set('params', action.payload);
    default:
      return state;
  }
};

export const getParams = (state) => state.get('params');
