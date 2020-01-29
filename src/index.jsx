/* global document, window */

import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import thunk from 'redux-thunk';
import warning from 'warning';
import { loadPrefs } from './actions/prefsActions';
import config from './config';
import App from './components/App';
import reducer from './reducers';

export default (customConfig) => {
  config.merge(customConfig);

  const container = config.get('container');
  const mountNode = document.querySelector(container);

  warning(
    mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace collection browser will not be rendered.`,
  );

  if (!mountNode) {
    return;
  }

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

  store.dispatch(loadPrefs());

  const locale = config.get('locale');
  const messages = config.get('messages');

  render(
    <IntlProvider
      defaultLocale="en-US"
      locale={locale}
      messages={messages}
    >
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </IntlProvider>,
    mountNode,
  );
};
