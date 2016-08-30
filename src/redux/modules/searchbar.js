const OPEN_SEARCHBAR = 'OPEN_SEARCHBAR';
const CLOSE_SEARCHBAR = 'CLOSE_SEARCHBAR';

const initialState = {
  opened: false,
};

export default function searchbar(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SEARCHBAR:
      return {
        ...state,
        opened: true
      };
    case CLOSE_SEARCHBAR:
      return {
        ...state,
        opened: false
      };
    default:
      return state;
  }
}

export function openSearchbar() {
  return {
    type: OPEN_SEARCHBAR,
    overlay: true,
  };
}

export function closeSearchbar() {
  return {
    type: CLOSE_SEARCHBAR,
    overlay: false,
  };
}
