import loadable from 'react-loadable';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import { load as loadSchedule } from 'store/actions/schedule';

const Contact = loadable({
  loader: () =>
    import(/* webpackChunkName: "Contact" */ 'containers/Contact/Contact'),
  loading: () => null,
});

const asyncPromises = [
  {
    promise: ({ store: { dispatch, getState } }) => {
      if (getState().schedule.data) {
        return null;
      }

      const result = dispatch(loadSchedule());

      return __CLIENT__ ? null : result;
    },
  },
];

const mapStateToProps = state => {
  const schedule = state.schedule.data;

  return {
    schedule,
  };
};

export default asyncConnect(asyncPromises)(connect(mapStateToProps)(Contact));
