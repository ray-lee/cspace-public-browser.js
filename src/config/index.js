import loget from 'lodash/get';
import lomerge from 'lodash/merge';
import defaultConfig from './defaults';

const config = lomerge({}, defaultConfig);

export default {
  get: (path, defaultValue) => loget(config, path, defaultValue),
  merge: (...sources) => lomerge(config, ...sources),
};
