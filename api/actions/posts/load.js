import posts from './posts';

export default function load(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(posts);
    }, 0);
  });
}
