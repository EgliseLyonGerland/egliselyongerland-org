import data from './data';

export default function post({ params: { postID } }) {
  return new Promise((resolve, reject) => {
    const _post = data.reduce((prev, curr) => (curr.ID === parseInt(postID) ? curr : prev), null);

    if (_post) {
      resolve(_post);
    }

    reject({
      status: 404,
      message: `Post ${postID} not found`,
    });
  });
}
