import loget from 'lodash/get';
import lomerge from 'lodash/merge';
import defaultConfig from './default';
import anthroConfig from './anthro';
import bonsaiConfig from './bonsai';
import botgardenConfig from './botgarden';
import fcartConfig from './fcart';
import herbariumConfig from './herbarium';
import lhmcConfig from './lhmc';
import materialsConfig from './materials';
import publicartConfig from './publicart';

const namedConfig = {
  anthro: anthroConfig,
  bonsai: bonsaiConfig,
  botgarden: botgardenConfig,
  fcart: fcartConfig,
  herbarium: herbariumConfig,
  lhmc: lhmcConfig,
  materials: materialsConfig,
  publicart: publicartConfig,
};

const config = lomerge({}, defaultConfig);

export default {
  get: (path, defaultValue) => loget(config, path, defaultValue),

  // eslint-disable-next-line no-console
  log: () => console.log(config),

  merge: (...sources) => {
    sources.forEach((source) => {
      const {
        baseConfig: baseConfigName,
      } = source;

      if (baseConfigName) {
        const baseConfig = namedConfig[baseConfigName];

        if (baseConfig) {
          lomerge(config, baseConfig);
        }
      }

      lomerge(config, source);
    });
  },

  getFilterFieldConfig: (id) => loget(config, ['filters', 'fields', id]),
};
