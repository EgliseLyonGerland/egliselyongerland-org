const _ = require('lodash');

const defaultTitle = 'Église Lyon Gerland';
const defaultDescription = 'Église réformée évangélique de Lyon Gerland';

const environment = {
  development: {
    isProduction: false,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    protocol: 'http',
    apiEndpoint: 'https://api.egliselyongerland.org',
  },
  production: {
    isProduction: true,
    host: process.env.HOST || 'www.egliselyongerland.org',
    port: process.env.PORT,
    protocol: 'https',
    apiEndpoint: 'https://api.egliselyongerland.org',
  },
}[process.env.NODE_ENV || 'development'];

const breakpoints = {
  xs: 500,
  sm: 700,
  md: 1000,
  lg: 1280,
  xl: 1400,
};

const breakpointNames = _.keys(breakpoints);
const breakpointSizes = _.values(breakpoints);
const breakpointMinSizes = [0, ...breakpointSizes];
const breakpointMaxSizes = _.map(breakpointSizes, value => value - 1);

const breakpointRanges = _.reduce(
  breakpointNames,
  (acc, name, index) => ({
    ...acc,
    [name]: [breakpointMinSizes[index], breakpointMaxSizes[index]],
  }),
  {},
);

module.exports = Object.assign(
  {
    app: {
      title: defaultTitle,
      description: defaultDescription,
      domain: 'egliselyongerland.org',
      head: {
        titleTemplate: `%s - ${defaultTitle}`,
        meta: [
          { name: 'description', content: defaultDescription },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: defaultTitle },
          {
            property: 'og:image',
            content: '/images/og-image.jpg',
          },
          { property: 'og:locale', content: 'fr_FR' },
          { property: 'og:title', content: defaultTitle },
          { property: 'og:description', content: defaultDescription },
          { property: 'twitter:site', content: 'EREdeLyon' },
        ],
      },
      breakpoints,
      breakpointNames,
      breakpointRanges,
    },
  },
  environment,
);