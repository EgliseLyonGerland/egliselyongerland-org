const { getNextWorship } = require('../utils');

test('getNextWorship()', () => {
  const worships = [
    { date: '2021-09-31' },
    { date: '2021-09-24' },
    { date: '2021-09-17' },
    { date: '2021-09-10' },
    { date: '2021-09-03' },
    { date: '2021-08-26' },
  ];

  const fn = now => getNextWorship(worships, new Date(now));

  expect(fn('2021-08-16')).toEqual({ date: '2021-08-26' });
  expect(fn('2021-08-26')).toEqual({ date: '2021-08-26' });
  expect(fn('2021-08-27')).toEqual({ date: '2021-09-03' });
  expect(fn('2030-08-27')).toEqual(null);
});
