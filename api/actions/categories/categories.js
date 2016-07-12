import data from './data';

export default function categories(req) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
