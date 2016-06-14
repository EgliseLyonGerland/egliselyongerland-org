const TOGGLE_SEARCH_VISIBILITY = 'DISPLAY_TOGGLE_SEARCH_VISIBILITY';
const SET_SEARCH_VISIBILITY = 'DISPLAY_SET_SEARCH_VISIBILITY';

export const SearchVisibilityStates = {
  SHOW: 'SHOW',
  HIDE: 'HIDE',
};

const initialState = {
  searchVisibility: SearchVisibilityStates.HIDE,
};

export default function display(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SEARCH_VISIBILITY:
      return {
        ...state,
        searchVisibility: (action.state === SearchVisibilityStates.SHOW ? SearchVisibilityStates.HIDE : SearchVisibilityStates.SHOW)
      };
    case SET_SEARCH_VISIBILITY:
      return {
        ...state,
        searchVisibility: action.state
      };
    default:
      return state;
  }
}

export function toggleSearchVisibility() {
  return {
    type: TOGGLE_SEARCH_VISIBILITY,
  };
}

export function setSearchVisibility(state) {
  return {
    type: SET_SEARCH_VISIBILITY,
    state,
  };
}
