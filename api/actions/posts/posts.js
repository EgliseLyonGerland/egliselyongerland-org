import data from './data';

export default function posts(req) {
  return new Promise((resolve, reject) => {
    resolve(data);
  });
}
