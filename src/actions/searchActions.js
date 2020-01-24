import Immutable from 'immutable';
import qs from 'qs';
import config from '../config';

import {
  OPEN_SEARCH,
} from '../constants/actionCodes';

export const openSearch = (history, params = Immutable.Map()) => {
  const queryString = qs.stringify(
    params
      .map((value) => (value && JSON.stringify(value)))
      .filter((value) => !!value)
      .toJS(),
    { format: 'RFC1738' },
  );

  history.push({
    search: `?${queryString}`,
  });

  return {
    type: OPEN_SEARCH,
    payload: queryString,
  };
};

export const search = () => (dispatch, getState) => {
  const defaultQuery = config.get('defaultQuery');

  return {};
};
