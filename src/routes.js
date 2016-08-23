import React from 'react';

import { IndexRoute, Route } from 'react-router';

import {
  App,
  Home,
  PersecutedChurch,
  Blog,
  Post,
  NotFound,
} from 'containers';

export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Blog routes */ }
    <Route path="/blog(/category/:typeSlug)(/book/:bookSlug)" component={Blog} />
    <Route path="/blog/post/:postId" component={Post} />

    { /* Other routes */ }
    <Route path="/persecuted-church" component={PersecutedChurch} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
