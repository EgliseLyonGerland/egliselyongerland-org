import React from 'react';

import { IndexRoute, Route } from 'react-router';

import {
    App,
    Home,
    PersecutedChurch,
    NotFound,
  } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      <Route path="/persecuted-church" component={PersecutedChurch} />

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
