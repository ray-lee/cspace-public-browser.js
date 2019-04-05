import Immutable from 'immutable';

import {
  SET_PANEL_RECT,
} from '../constants/actionCodes';

const setPanelRect = (state, id, rect) => state.setIn(['panels', id, 'rect'], rect);

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_PANEL_RECT:
      return setPanelRect(state, action.meta.id, action.payload);
    default:
      return state;
  }
};

export const getPanelRect = (state, id) => state.getIn(['panels', id, 'rect']);
