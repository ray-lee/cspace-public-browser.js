import Immutable from 'immutable';
import qs from 'qs';

import {
  SET_SEARCH_PAGE_PARAMS,
} from '../constants/actionCodes';

export const initSearchPage = (location) => {
  const params = Immutable.Map(qs.parse(location.search, { ignoreQueryPrefix: true }))
    .filter((value) => !!value)
    .map((value) => JSON.parse(value));

  return {
    type: SET_SEARCH_PAGE_PARAMS,
    payload: params,
  };
};
