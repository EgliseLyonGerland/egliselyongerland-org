const { getNextWorship } = require('../utils');

const worships = [
  {
    date: Date.UTC(2021, 9, 10, 10, 0, 0),
    location: 0,
  },
  {
    date: Date.UTC(2021, 9, 3, 10, 0, 0),
    location: 1,
  },
  {
    date: Date.UTC(2021, 8, 26, 10, 0, 0),
    location: 2,
  },
];

test('getNextWorship()', () => {
  expect(getNextWorship(worships, Date.UTC(2021, 8, 16, 10, 0))).toEqual(
    worships[2],
  );
  expect(getNextWorship(worships, Date.UTC(2021, 8, 26, 10, 0))).toEqual(
    worships[2],
  );
  expect(getNextWorship(worships, Date.UTC(2021, 8, 26, 13, 59))).toEqual(
    worships[2],
  );
  expect(getNextWorship(worships, Date.UTC(2021, 8, 26, 14, 0))).toEqual(
    worships[1],
  );
  expect(getNextWorship(worships, Date.UTC(2021, 8, 27, 10, 0))).toEqual(
    worships[1],
  );
  expect(getNextWorship(worships, Date.UTC(2030, 8, 27, 10, 0))).toEqual(null);
});
