const validQueryDomains = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'gaming.youtube.com',
]);

const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube.com\/(embed|v)\/)/;

const idRegex = /^[a-zA-Z0-9-_]{11}$/;

export const validateId = id => idRegex.test(id);

export const findVideoId = link => {
  const parsed = new URL(link);
  const query = new URLSearchParams(parsed.search);

  let id = query.get('v');

  if (validPathDomains.test(link) && !id) {
    const paths = parsed.pathname.split('/');
    id = paths[paths.length - 1];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    throw Error('Not a YouTube domain');
  }

  if (!id) {
    throw Error(`No video id found: ${link}`);
  }

  id = id.substring(0, 11);

  if (!validateId(id)) {
    throw TypeError(
      `Video id (${id}) does not match expected ` +
        `format (${idRegex.toString()})`,
    );
  }

  return id;
};
