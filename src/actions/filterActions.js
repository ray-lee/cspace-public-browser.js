import { SET_FILTER_SEARCH_VALUE } from '../constants/actionCodes';

export const setFilterSearchValue = (id, value) => ({
  type: SET_FILTER_SEARCH_VALUE,
  payload: value,
  meta: {
    id,
  },
});
