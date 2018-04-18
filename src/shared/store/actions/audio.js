export const OPEN_AUDIO = "OPEN_AUDIO";
export const CLOSE_AUDIO = "CLOSE_AUDIO";
export const PLAY_AUDIO = "PLAY_AUDIO";
export const PAUSE_AUDIO = "PAUSE_AUDIO";

export function openAudio(url, play = false) {
  return {
    type: OPEN_AUDIO,
    url,
    play
  };
}

export function closeAudio() {
  return {
    type: CLOSE_AUDIO
  };
}

export function playAudio() {
  return {
    type: PLAY_AUDIO
  };
}

export function pauseAudio() {
  return {
    type: PAUSE_AUDIO
  };
}
