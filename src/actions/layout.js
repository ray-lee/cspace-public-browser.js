import {
  SET_PANEL_RECT,
} from '../constants/actionCodes';

export const setPanelRect = (id, rect) => ({
  type: SET_PANEL_RECT,
  payload: rect,
  meta: {
    id,
  },
});
