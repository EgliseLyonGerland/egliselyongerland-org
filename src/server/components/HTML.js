/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const HTML = ({ children, scripts, styles, css, state }) => {
  const head = Helmet.renderStatic();

  return (
    <html lang="fr">
      <head>
        <meta
          content="width=device-width, initial-scale=1, user-scalable=no"
          name="viewport"
        />

        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}

        {styles.map(
          href => href && <link key={href} href={href} rel="stylesheet" />,
        )}

        <link href="/favicon.ico" rel="icon" />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700&display=swap&text=AÂBCEFIÎLNORTUVSP"
          rel="stylesheet"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${state}`,
          }}
        />

        <style
          dangerouslySetInnerHTML={{ __html: css }}
          id="server-side-styles"
        />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: children }} id="app" />
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
  scripts: PropTypes.arrayOf(PropTypes.string),
  state: PropTypes.string,
  styles: PropTypes.arrayOf(PropTypes.string.isRequired),
};

HTML.defaultProps = {
  css: '',
  styles: [],
  scripts: [],
  state: '{}',
};

export default HTML;
