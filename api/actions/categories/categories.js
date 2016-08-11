import data from './data';

export default function categories() {
  return new Promise(resolve => {
    resolve(data);
  });
}
