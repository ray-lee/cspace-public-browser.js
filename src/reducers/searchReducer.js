import Immutable from 'immutable';

import {
  SEARCH_STARTED,
  SEARCH_FULFILLED,
  SEARCH_REJECTED,
} from '../constants/actionCodes';

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SEARCH_STARTED:
      return state
        .set('pending', true)
        .delete('result')
        .delete('error');
    case SEARCH_FULFILLED:
      return state
        .delete('pending')
        .set('result', Immutable.fromJS(action.payload))
        .delete('error');
    case SEARCH_REJECTED:
      return state
        .delete('pending')
        .delete('result')
        .set('error', action.payload);
    default:
      return state;
  }
};

export const getError = (state) => state.get('error');
export const getResult = (state) => state.get('result');
export const isPending = (state) => !!state.get('pending');
