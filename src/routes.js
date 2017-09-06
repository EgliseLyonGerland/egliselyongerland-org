import React from "react";

import { IndexRoute, Route } from "react-router";

import churchTabs from "./config/church-tabs";

import {
  App,
  Home,
  PersecutedChurch,
  Blog,
  Post,
  Church,
  NotFound,
  Wip
} from "containers";

export default () =>
  <Route path="/" component={App}>
    {/* Home (main) route */}
    <IndexRoute component={Home} />

    {/* Church routes */}
    <Route component={Church}>
      {churchTabs.map(tab =>
        <Route key={tab.slug} path={`/${tab.slug}`} component={tab.component} />
      )}
    </Route>

    {/* Blog routes */}
    <Route
      path="/blog(/category/:category)(/author/:author)(/book/:book)"
      component={Blog}
    />
    <Route path="/blog/post/:postId" component={Post} />

    {/* Other routes */}
    <Route path="/persecuted-church" component={PersecutedChurch} />
    <Route path="/youngs" component={Wip} />
    <Route path="/contact" component={Wip} />

    {/* Catch all route */}
    <Route path="*" component={NotFound} status={404} />
  </Route>;
