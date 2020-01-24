import Immutable from 'immutable';

import {
  SET_FILTER_SEARCH_VALUE,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_FILTER_SEARCH_VALUE:
      return state.setIn([action.meta.id, 'searchValue'], action.payload);
    default:
      return state;
  }
};

export const getSearchValue = (state, id) => state.getIn([id, 'searchValue']);
