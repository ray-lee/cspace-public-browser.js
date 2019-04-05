export default (className) => {
  const name = className.split('--', 1)[0];

  return `has-${name}`;
};
