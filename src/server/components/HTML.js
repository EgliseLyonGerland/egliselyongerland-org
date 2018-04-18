/* eslint-disable react/no-danger */
import React, { Component } from "react";
import Helmet from "react-helmet";

export default class extends Component {
  static defaultProps = {
    css: [],
    scripts: [],
    state: "{}"
  };

  render() {
    const head = Helmet.renderStatic();
    const { children, scripts, styles, css, state } = this.props;
    return (
      <html lang="">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />

          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {styles.map(href => {
            return <link key={href} rel="stylesheet" href={href} />;
          })}

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
            href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900"
            rel="stylesheet"
            type="text/css"
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.__PRELOADED_STATE__ = ${state}`
            }}
          />

          <style
            id="server-side-styles"
            dangerouslySetInnerHTML={{ __html: css }}
          />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {scripts.map(src => {
            return <script key={src} src={src} />;
          })}
        </body>
      </html>
    );
  }
}
