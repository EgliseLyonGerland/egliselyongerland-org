import { closeSearchbar } from "redux/actions/searchbar";
import { closeSidebar } from "redux/actions/sidebar";

export default ({ dispatch, getState }) => next => action => {
  const state = getState();

  if (
    action.type !== "@@router/LOCATION_CHANGE" ||
    (!state.sidebar.opened && !state.searchbar.opened)
  ) {
    return next(action);
  }

  dispatch(closeSidebar());
  dispatch(closeSearchbar());

  setTimeout(() => next(action), 500);

  return null;
};
