import { SHOW_OVERLAY, HIDE_OVERLAY } from '../actions/overlay';

const initialState = {
  active: false,
};

export default function overlay(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return {
        ...state,
        active: true,
      };
    case HIDE_OVERLAY:
      return {
        ...state,
        active: false,
      };
    default:
      return state;
  }
}
