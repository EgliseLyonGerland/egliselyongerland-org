import { closeSearchbar } from 'redux/modules/searchbar';
import { closeSidebar } from 'redux/modules/sidebar';

export default ({ dispatch, getState }) => {
  return next => action => {
    const state = getState();

    if (
      action.type !== '@@router/LOCATION_CHANGE' ||
      (!state.sidebar.opened && !state.searchbar.opened)
    ) {
      return next(action);
    }

    dispatch(closeSidebar());
    dispatch(closeSearchbar());

    setTimeout(() => {
      return next(action);
    }, 500);
  };
};
