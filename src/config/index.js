import loget from 'lodash/get';
import lomerge from 'lodash/merge';
import defaultConfig from './default';
import materialorderConfig from './materialorder';

const namedConfig = {
  materialorder: materialorderConfig,
};

const config = lomerge({}, defaultConfig);

let filterConfigsById;

export default {
  get: (path, defaultValue) => loget(config, path, defaultValue),

  merge: (...sources) => {
    sources.forEach((source) => {
      const sourceConfig = (typeof source === 'string')
        ? namedConfig[source]
        : source;

      lomerge(config, sourceConfig);
    });
  },

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
