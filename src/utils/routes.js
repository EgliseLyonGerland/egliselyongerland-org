import qs from 'qs';

export default {
  blog: (params = {}) => {
    const paths = [];

    if (params.category) {
      paths.push(`/category/${params.category}`);
    }

    if (params.author) {
      paths.push(`/author/${params.author}`);
    }

    if (params.book) {
      paths.push(`/book/${params.book}`);
    }

    const query = qs.stringify({
      ...params,
      category: undefined,
      author: undefined,
      book: undefined,
    });


    if (query) {
      paths.push(`?${query}`);
    }

    return `/blog${paths.join('')}`;
  },

  post: (id) => (
    `/blog/post/${id}`
  ),

  church: () => '/church',
  youngs: () => '/youngs',
  contact: () => '/contact',
  persecutedChurch: () => '/persecuted-church',
};
