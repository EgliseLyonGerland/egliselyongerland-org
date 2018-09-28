/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const HTML = ({ children, scripts, styles, css, state }) => {
  const head = Helmet.renderStatic();

  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        {styles.map(href => (
          <link key={href} rel="stylesheet" href={href} />
        ))}

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700"
          rel="stylesheet"
          type="text/css"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />

        <style
          id="server-side-styles"
          dangerouslySetInnerHTML={{ __html: css }}
        />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
        {scripts.map(src => (
          <script key={src} src={src} />
        ))}
      </body>
    </html>
  );
};

HTML.propTypes = {
  children: PropTypes.string.isRequired,
  css: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.string.isRequired),
  scripts: PropTypes.arrayOf(PropTypes.string),
  state: PropTypes.string,
};

HTML.defaultProps = {
  css: '',
  styles: [],
  scripts: [],
  state: '{}',
};

export default HTML;
