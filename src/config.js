require('babel-polyfill');

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
    title: 'React Redux Example',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: '%s — Église Lyon Gerland',
      meta: [
        { name: 'description', content: 'All the modern best practices in one example.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React Redux Example' },
        { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React Redux Example' },
        { property: 'og:description', content: 'All the modern best practices in one example.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: '@erikras' },
        { property: 'og:creator', content: '@erikras' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
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
