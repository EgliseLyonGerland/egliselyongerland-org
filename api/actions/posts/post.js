import data from './data';

export default function post({ params: { postID } }) {
  return new Promise((resolve, reject) => {
    const post = data.reduce((result, datum) => (datum.ID == postID ? datum : result), null);

    if (post) {
      resolve(post);
    }

    reject({
      status: 404,
      message: `Post ${postID} not found`,
    });
  });
}
