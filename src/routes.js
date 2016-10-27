import React from 'react';

import { IndexRoute, Route } from 'react-router';

import {
  App,
  Home,
  PersecutedChurch,
  Blog,
  Post,
  NotFound,
  Wip,
} from 'containers';

export default () => (
  <Route path="/" component={App}>
    { /* Home (main) route */ }
    <IndexRoute component={Home} />

    { /* Blog routes */ }
    <Route path="/blog(/category/:category)(/author/:author)(/book/:book)" component={Blog} />
    <Route path="/blog/post/:postId" component={Post} />

    { /* Other routes */ }
    <Route path="/persecuted-church" component={PersecutedChurch} />
    <Route path="/church" component={Wip} />
    <Route path="/youngs" component={Wip} />
    <Route path="/contact" component={Wip} />

    { /* Catch all route */ }
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
