import data from './data';

export default function post(req, [ id ]) {
  return new Promise((resolve, reject) => {
    const post = data.reduce((result, datum) => (datum.ID == id ? datum : result), null);

    if (post) {
      resolve(post);
    }

    reject({
      status: 404,
      message: `Post ${id} not found`,
    });
  });
}
