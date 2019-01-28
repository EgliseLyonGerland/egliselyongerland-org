export const OPEN_ANNOUNCEMENT = 'OPEN_ANNOUNCEMENT';
export const CLOSE_ANNOUNCEMENT = 'CLOSE_ANNOUNCEMENT';

export function openAnnouncement() {
  return {
    type: OPEN_ANNOUNCEMENT,
  };
}

export function closeAnnouncement() {
  return {
    type: CLOSE_ANNOUNCEMENT,
  };
}
