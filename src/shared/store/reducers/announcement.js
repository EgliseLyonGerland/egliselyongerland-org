import { OPEN_ANNOUNCEMENT, CLOSE_ANNOUNCEMENT } from '../actions/announcement';

const initialState = {
  opened: false,
  count: 0,
};

export default function announcement(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_ANNOUNCEMENT:
      return {
        ...state,
        opened: true,
        count: state.count + 1,
      };
    case CLOSE_ANNOUNCEMENT:
      return {
        ...state,
        opened: false,
      };
    default:
      return state;
  }
}
