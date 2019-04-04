/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import warning from 'warning';
import { loadPrefs } from './actions/prefs';
import config from './config';
import App from './components/App';
import reducer from './reducers';

module.exports = (customConfig) => {
  config.merge(customConfig);

  const container = config.get('container');
  const mountNode = document.querySelector(container);

  warning(
    mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace browser will not be rendered.`,
  );

  if (!mountNode) {
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  store.dispatch(loadPrefs());

  render(
    <IntlProvider locale="en-US" defaultLocale="en-US">
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </IntlProvider>,
    mountNode,
  );
};
