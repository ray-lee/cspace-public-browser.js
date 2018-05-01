import React from 'react';
import { render } from 'react-dom';
import warning from 'warning';
import App from './components/App';

const defaultConfig = {
  container: '#cspace-browser',
};

module.exports = (browserConfig) => {
  const config = Object.assign({}, defaultConfig, browserConfig);

  const {
    container,
  } = config;

  const mountNode = document.querySelector(container);

  warning(mountNode,
    `No container element was found using the selector '${container}'. The CollectionSpace browser will not be rendered.`);

  render(<App />, mountNode);
};
