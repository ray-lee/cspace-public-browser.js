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
    .map(path => get(data, path))
    .map((part, index) => (part && formatters[index] ? formatters[index](part) : part))
    .filter(part => !!part)
    .join(separator);

  return ((value && prefix) ? `${prefix}${value}` : value);
};
