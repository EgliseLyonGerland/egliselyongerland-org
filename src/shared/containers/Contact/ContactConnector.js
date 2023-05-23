import loadable from 'react-loadable';
import { connect } from 'react-redux';

const Contact = loadable({
  loader: () =>
    import(/* webpackChunkName: "Contact" */ 'containers/Contact/Contact'),
  loading: () => null,
});

const mapStateToProps = state => {
  const config = state.config.data;

  return {
    config,
  };
};

export default connect(mapStateToProps)(Contact);
