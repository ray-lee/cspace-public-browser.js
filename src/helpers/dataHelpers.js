import get from 'lodash/get';

export const findFirstPath = ({
  data,
  inPath,
  test,
  appendPath,
}) => {
  const array = inPath ? get(data, inPath) : data;

  if (Array.isArray(array)) {
    const index = array.findIndex(test);

    if (index >= 0) {
      return [...inPath, index, ...appendPath];
    }
  }

  return undefined;
};

export const findFirstValue = (params) => {
  const path = findFirstPath(params);

  return (path ? get(params.data, path) : undefined);
};

export const joinFields = ({
  data,
  prefix,
  separator,
  paths,
  formatters = [],
}) => {
  const value = paths
    .map((path) => get(data, path))
    .map((part, index) => (part && formatters[index] ? formatters[index](part) : part))
    .filter((part) => !!part)
    .join(separator);

  return ((value && prefix) ? `${prefix}${value}` : value);
};

export const isNotEmpty = (value) => {
  if (typeof value === 'undefined' || value === null || value === '') {
    return false;
  }

  if (Array.isArray(value)) {
    return !!value.find((instance) => isNotEmpty(instance));
  }

  if (typeof value === 'object') {
    return !!Object.values(value).find((childValue) => isNotEmpty(childValue));
  }

  return true;
};
