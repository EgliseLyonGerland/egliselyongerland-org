const OPEN_SIDEBAR = "OPEN_SIDEBAR";
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";

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

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR
  };
}

export function closeSidebar() {
  return {
    type: CLOSE_SIDEBAR
  };
}
