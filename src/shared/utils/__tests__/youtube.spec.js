const { findVideoId, validateId } = require('../youtube');

describe('validateId()', () => {
  test('Retrieves whether a string includes a video ID', () => {
    let rs;
    rs = validateId('RAW_VIDEOID');
    expect(rs).toBe(true);
    rs = validateId('http://www.youtube.com/watch?v=RAW_VIDEOID');
    expect(rs).toBe(false);
    rs = validateId('https://www.twitch.tv/user/v/1234');
    expect(rs).toBe(false);
  });
});

describe('findVideoId()', () => {
  test('Retrives the video ID from the url', () => {
    let id;
    id = findVideoId('http://www.youtube.com/watch?v=RAW_VIDEOID');
    expect(id).toEqual('RAW_VIDEOID');
    id = findVideoId('http://youtu.be/RAW_VIDEOID');
    expect(id).toEqual('RAW_VIDEOID');
    id = findVideoId('http://youtube.com/v/RAW_VIDEOID');
    expect(id).toEqual('RAW_VIDEOID');
    id = findVideoId('http://youtube.com/embed/RAW_VIDEOID');
    expect(id).toEqual('RAW_VIDEOID');
    id = findVideoId(
      'https://music.youtube.com/watch?v=RAW_VIDEOID&list=RDAMVMmtLgabce8KQ',
    );
    expect(id).toEqual('RAW_VIDEOID');
    id = findVideoId('https://gaming.youtube.com/watch?v=RAW_VIDEOID');
    expect(id).toEqual('RAW_VIDEOID');
    expect(() => {
      findVideoId('https://any.youtube.com/watch?v=RAW_VIDEOID');
    }).toThrow(/Not a YouTube domain/);
    expect(() => {
      findVideoId('https://www.twitch.tv/user/v/1234');
    }).toThrow(/Not a YouTube domain/);
    expect(() => {
      findVideoId('www.youtube.com');
    }).toThrow('Invalid URL: www.youtube.com');
    expect(() => {
      findVideoId('http://www.youtube.com/playlist?list=1337');
    }).toThrow(/No video id found: \S+/);
    expect(() => {
      findVideoId('http://www.youtube.com/watch?v=asdf$%^ddf-');
    }).toThrow(/Video id \([^)]+\) does not match expected format/);
  });
});
