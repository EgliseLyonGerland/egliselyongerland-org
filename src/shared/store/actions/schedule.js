export const LOAD = 'SCHEDULE_LOAD';
export const LOAD_SUCCESS = 'SCHEDULE_LOAD_SUCCESS';
export const LOAD_FAIL = 'SCHEDULE_LOAD_FAIL';

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client =>
      client.get(
        `https://firebasestorage.googleapis.com/v0/b/egliselyongerland-org/o/schedule.json?alt=media&token=eeeb596e-20f2-4103-99c1-511154dc267e`,
      ),
  };
}
