import createCache from '@emotion/cache';

const stylesCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default stylesCache;