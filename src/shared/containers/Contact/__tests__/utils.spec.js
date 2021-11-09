const { getNextWorship } = require('../utils');

const worships = [
  {
    date: Date.UTC(2021, 9, 31, 10, 0, 0),
    location: 0,
  },
  {
    date: Date.UTC(2021, 9, 24, 10, 0, 0),
    location: 1,
  },
  {
    date: Date.UTC(2021, 9, 17, 17, 0, 0),
    location: 2,
  },
  {
    date: Date.UTC(2021, 9, 10, 10, 0, 0),
    location: 3,
  },
  {
    date: Date.UTC(2021, 9, 3, 10, 0, 0),
    location: 4,
  },
  {
    date: Date.UTC(2021, 8, 26, 10, 0, 0),
    location: 5,
  },
];

test('getNextWorship()', () => {
  const fn = (...args) => getNextWorship(worships, Date.UTC(...args));

  expect(fn(2021, 8, 16, 10, 0)).toEqual(worships[5]);
  expect(fn(2021, 8, 26, 10, 0)).toEqual(worships[5]);
  expect(fn(2021, 8, 26, 13, 59)).toEqual(worships[5]);
  expect(fn(2021, 8, 26, 14, 0)).toEqual(worships[4]);
  expect(fn(2021, 8, 27, 10, 0)).toEqual(worships[4]);
  expect(fn(2030, 8, 27, 10, 0)).toEqual(null);
});
