import data from './data';

export default function posts({ query }) {
  return new Promise((resolve, reject) => {
    const {
      limit = 100,
      offset = 0 } = query;

    let results = data.slice(offset, limit);

    resolve(results);
  });
}
