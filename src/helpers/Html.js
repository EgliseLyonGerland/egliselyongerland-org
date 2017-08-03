import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import bootstrapConfig from '../theme/bootstrap.config.js';
// import appStyles from '../containers/App/App.scss';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
const Html = ({ assets, component, store }) => {
  const content = component ? ReactDOM.renderToString(component) : '';
  const head = Helmet.renderStatic();

  return (
    <html lang="en-US">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-194x194.png" sizes="194x194" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link href="https://fonts.googleapis.com/css?family=Lato:400,100,300,700,900" rel="stylesheet" type="text/css" />

        {/* styles (will be present only in production with webpack extract text plugin) */}
        {Object.keys(assets.styles).map((style, key) =>
          <link
            href={assets.styles[style]}
            key={key}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
          />
        )}

        {/**
          * (will be present only in development mode) outputs a <style/> tag with all
          * bootstrap styles + App.scss + it could be CurrentPage.scss. can smoothen
          * the initial style flash (flicker) on page load in development mode.
          * ideally one could also include here the style for the current page
          * (Home.scss, About.scss, etc)
          */}
        {Object.keys(assets.styles).length === 0 &&
          <style dangerouslySetInnerHTML={{ __html: `${bootstrapConfig}` }} />
        }
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          charSet="UTF-8"
          dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
        />
        <script src={assets.javascript.main} charSet="UTF-8" />
      </body>
    </html>
  );
};

Html.propTypes = {
  assets: PropTypes.object,
  component: PropTypes.node,
  store: PropTypes.object
};

export default Html;
