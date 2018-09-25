/* global window */

import Immutable from 'immutable';

import {
  EXPAND_PANEL,
  PREFS_LOADED,
  TOGGLE_PANEL,
} from '../constants/actionCodes';

import config from '../config';
import { getPrefs } from '../reducers';

// Username to use for pref storage when user is not logged in
const anonymousUsername = '*';

export const loadPrefs = () => (dispatch) => {
  const username = anonymousUsername;
  const storageKey = config.get('storageKey');

  let userPrefs = null;

  if (username) {
    const serializedPrefs = window.localStorage.getItem(storageKey);

    if (serializedPrefs) {
      try {
        userPrefs = Immutable.fromJS((JSON.parse(serializedPrefs))[username]);
      } catch (error) {
        userPrefs = null;
      }
    }
  }

  const defaultUserPrefs = config.get('defaultUserPrefs');

  if (defaultUserPrefs) {
    userPrefs = (Immutable.fromJS(defaultUserPrefs)).mergeDeep(userPrefs);
  }

  dispatch({
    type: PREFS_LOADED,
    payload: userPrefs,
  });
};

export const savePrefs = () => (dispatch, getState) => {
  const username = anonymousUsername;
  const storageKey = config.get('storageKey');

  let prefs;

  if (username) {
    const serializedPrefs = window.localStorage.getItem(storageKey);

    if (serializedPrefs) {
      try {
        prefs = JSON.parse(serializedPrefs);
      } catch (error) {
        prefs = null;
      }
    }

    if (!prefs) {
      prefs = {};
    }

    prefs[username] = getPrefs(getState()).toJS();

    window.localStorage.setItem(storageKey, JSON.stringify(prefs));
  }
};

export const expandPanel = (id, expanded = true) => (dispatch) => {
  dispatch({
    type: EXPAND_PANEL,
    payload: expanded,
    meta: {
      id,
    },
  });

  dispatch(savePrefs());
};

export const togglePanel = id => (dispatch) => {
  dispatch({
    type: TOGGLE_PANEL,
    meta: {
      id,
    },
  });

  dispatch(savePrefs());
};
