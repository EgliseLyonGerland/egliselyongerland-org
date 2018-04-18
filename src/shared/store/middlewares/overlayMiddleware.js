import { showOverlay, hideOverlay } from "../actions/overlay";

export default ({ dispatch }) => next => action => {
  const { overlay, overlayDelay = 0 } = action;

  if (typeof overlay === "undefined") {
    return next(action);
  }

  setTimeout(() => {
    dispatch(overlay ? showOverlay() : hideOverlay());
  }, overlayDelay * 1000);

  return next(action);
};
