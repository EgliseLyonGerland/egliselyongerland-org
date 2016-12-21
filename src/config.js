require('babel-polyfill');

const defaultTitle = 'Église Lyon Gerland';
const defaultDescription = 'Église réformée évangélique de Lyon Gerland';

const environment = {
  development: {
    isProduction: false,
    apiEndpoint: 'http://api.egliselyongerland.local',
    disqus: {
      shortname: 'egliselyongerland-dev',
    },
  },
  production: {
    isProduction: true,
    apiEndpoint: 'http://api.egliselyongerland.org',
    disqus: {
      shortname: 'egliselyongerland',
    },
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: 'localhost',
  apiPort: 3030,
  apiEndpoint: 'http://localhost:3030/api',
  app: {
    title: defaultTitle,
    description: defaultDescription,
    head: {
      titleTemplate: `%s - ${defaultTitle}`,
      meta: [
        { name: 'description', content: defaultDescription },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: defaultTitle },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:title', content: defaultTitle },
        { property: 'og:description', content: defaultDescription },
        { property: 'twitter:site', content: 'EREdeLyon' },
      ]
    },
    breakpoints: {
      xs: 500,
      sm: 700,
      md: 1000,
      lg: 1280,
      xl: 1400
    }
  },

}, environment);
