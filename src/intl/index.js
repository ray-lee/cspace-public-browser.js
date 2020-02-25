import {
  createIntl as baseCreateIntl,
  createIntlCache,
} from 'react-intl';

const intlCache = createIntlCache();

let intl;

export const createIntl = (config) => {
  intl = baseCreateIntl(config, intlCache);

  return intl;
};

export const getIntl = () => intl;
