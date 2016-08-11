import data from './data';

export default function post({ params: { postID } }) {
  return new Promise((resolve, reject) => {
    const _post = data.reduce((result, datum) => (datum.ID === postID ? datum : result), null);

    if (_post) {
      resolve(_post);
    }

    reject({
      status: 404,
      message: `Post ${postID} not found`,
    });
  });
}
