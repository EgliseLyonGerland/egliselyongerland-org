import { OPEN_SEARCHBAR, CLOSE_SEARCHBAR } from '../actions/searchbar';

const initialState = {
  opened: false,
};

export default function searchbar(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_SEARCHBAR:
      return {
        ...state,
        opened: true,
      };
    case CLOSE_SEARCHBAR:
      return {
        ...state,
        opened: false,
      };
    default:
      return state;
  }
}
