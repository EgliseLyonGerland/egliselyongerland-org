export const OPEN_SEARCHBAR = 'OPEN_SEARCHBAR';
export const CLOSE_SEARCHBAR = 'CLOSE_SEARCHBAR';

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
