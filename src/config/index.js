import loget from 'lodash/get';
import lomerge from 'lodash/merge';
import defaultConfig from './defaults';

const config = lomerge({}, defaultConfig);

let filterConfigsById;

export default {
  get: (path, defaultValue) => loget(config, path, defaultValue),
  merge: (...sources) => lomerge(config, ...sources),

  getFilterConfig: (id) => {
    if (!filterConfigsById) {
      filterConfigsById = {};

      loget(config, 'filterGroups', []).forEach(({ filters }) => {
        filters.forEach((filterConfig) => {
          filterConfigsById[filterConfig.id] = filterConfig;
        });
      });
    }

    return filterConfigsById[id];
  },
};
