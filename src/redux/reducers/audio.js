import {
  OPEN_AUDIO,
  CLOSE_AUDIO,
  PLAY_AUDIO,
  PAUSE_AUDIO
} from "redux/actions/audio";

const initialState = {
  url: null,
  opened: false,
  playing: false
};

export default function audio(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN_AUDIO:
      return {
        ...state,
        url: action.url,
        opened: true,
        playing: action.play
      };
    case CLOSE_AUDIO:
      return {
        ...state,
        url: null,
        opened: false,
        playing: false
      };
    case PLAY_AUDIO:
      return {
        ...state,
        playing: true
      };
    case PAUSE_AUDIO:
      return {
        ...state,
        playing: false
      };
    default:
      return state;
  }
}
