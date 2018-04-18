import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions/sidebar";

const initialState = {
  opened: false
};

export default function sidebar(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        ...state,
        opened: true
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        opened: false
      };
    default:
      return state;
  }
}
