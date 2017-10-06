import React from "react";

import { IndexRoute, Route } from "react-router";

import churchTabs from "./config/church-tabs";

import { App, Blog, Church, Contact, Home, NotFound, Post } from "containers";

export default () => (
  <Route path="/" component={App}>
    {/* Home (main) route */}
    <IndexRoute component={Home} />

    {/* Church routes */}
    <Route component={Church}>
      {churchTabs.map(tab => (
        <Route key={tab.slug} path={`/${tab.slug}`} component={tab.component} />
      ))}
    </Route>

    {/* Blog routes */}
    <Route
      path="/blog(/category/:category)(/author/:author)(/book/:book(/chapter/:chapter))"
      component={Blog}
    />
    <Route path="/blog/post/:postId" component={Post} />

    <Route path="/contact" component={Contact} />

    {/* Catch all route */}
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
