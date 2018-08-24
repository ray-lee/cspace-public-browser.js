import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';
import warning from 'warning';
import config from './config';
import App from './components/App';

module.exports = (customConfig) => {
  config.merge(customConfig);

  const container = config.get('container');
  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace browser will not be rendered.`);

  render(
    <IntlProvider locale="en-US" defaultLocale="en-US">
      <App />
    </IntlProvider>, mountNode);
};
