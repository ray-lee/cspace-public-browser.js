import { SET_FILTER_SEARCH_VALUE } from '../constants/actionCodes';

// eslint-disable-next-line import/prefer-default-export
export const setFilterSearchValue = (id, value) => ({
  type: SET_FILTER_SEARCH_VALUE,
  payload: value,
  meta: {
    id,
  },
});
