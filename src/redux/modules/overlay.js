const SHOW_OVERLAY = 'SHOW_OVERLAY';
const HIDE_OVERLAY = 'HIDE_OVERLAY';

const initialState = {
  active: false,
};

export default function overlay(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return {
        ...state,
        active: true
      };
    case HIDE_OVERLAY:
      return {
        ...state,
        active: false
      };
    default:
      return state;
  }
}

export function showOverlay() {
  return {
    type: SHOW_OVERLAY,
  };
}

export function hideOverlay() {
  return {
    type: HIDE_OVERLAY,
  };
}
