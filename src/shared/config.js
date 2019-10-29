const defaultTitle = 'Église Lyon Gerland';
const defaultDescription = 'Église réformée évangélique de Lyon Gerland';

const environment = {
  development: {
    isProduction: false,
    host: process.env.HOST || 'localhost',
    port: process.env.PORT,
    protocol: 'http',
    // apiEndpoint: 'http://api.egliselyongerland.local',
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

module.exports = {
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
          content: '/static/og-image.jpg',
        },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:title', content: defaultTitle },
        { property: 'og:description', content: defaultDescription },
        { property: 'twitter:site', content: 'EREdeLyon' },
      ],
    },
  },
  ...environment,
};
