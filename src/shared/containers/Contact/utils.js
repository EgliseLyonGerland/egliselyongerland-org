export function getNextWorship(worships, now = Date.now()) {
  return worships.reduce(
    (acc, item) =>
      // console.log(
      //   new Date(item.date + 4 * 60 * 60 * 1000).toUTCString(),
      //   new Date(now).toUTCString(),
      //   item.date + 4 * 60 * 60 * 1000 - now,
      //   item.date + 4 * 60 * 60 * 1000 >= now,
      // );
      item.date + 4 * 60 * 60 * 1000 > now ? item : acc,
    null,
  );
}
