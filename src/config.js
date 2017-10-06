require("babel-polyfill");

const defaultTitle = "Église Lyon Gerland";
const defaultDescription = "Église réformée évangélique de Lyon Gerland";

const environment = {
  development: {
    isProduction: false,
    apiEndpoint: "http://api.egliselyongerland.org"
  },
  production: {
    isProduction: true,
    apiEndpoint: "https://api.egliselyongerland.org"
  }
}[process.env.NODE_ENV || "development"];

module.exports = Object.assign(
  {
    host: process.env.HOST || "localhost",
    port: process.env.PORT,
    app: {
      title: defaultTitle,
      description: defaultDescription,
      domain: "egliselyongerland.org",
      host: "http://www.egliselyongerland.org",
      head: {
        titleTemplate: `%s - ${defaultTitle}`,
        meta: [
          { name: "description", content: defaultDescription },
          { charset: "utf-8" },
          { property: "og:site_name", content: defaultTitle },
          {
            property: "og:image",
            content: "/images/og-image.jpg"
          },
          { property: "og:locale", content: "fr_FR" },
          { property: "og:title", content: defaultTitle },
          { property: "og:description", content: defaultDescription },
          { property: "twitter:site", content: "EREdeLyon" }
        ]
      },
      breakpoints: {
        xs: 500,
        sm: 700,
        md: 1000,
        lg: 1280,
        xl: 1400
      }
    }
  },
  environment
);
