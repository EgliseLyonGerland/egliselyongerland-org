export const LOAD = 'CONFIG_LOAD';
export const LOAD_SUCCESS = 'CONFIG_LOAD_SUCCESS';
export const LOAD_FAIL = 'CONFIG_LOAD_FAIL';

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client
        .get(
          `https://raw.githubusercontent.com/EgliseLyonGerland/egliselyongerland-org/config/main.json`,
        )
        .then(({ text }) => JSON.parse(text)),
  };
}
