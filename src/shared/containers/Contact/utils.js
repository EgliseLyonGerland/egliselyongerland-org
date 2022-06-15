function dateToNumber(date) {
  return (
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
  );
}

export function getNextWorship(worships, now = new Date()) {
  const current = dateToNumber(now);

  return worships.reduce(
    (acc, item) => (dateToNumber(new Date(item.date)) >= current ? item : acc),
    null,
  );
}
