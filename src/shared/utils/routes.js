import qs from 'qs';

import config from 'config';

const routes = {
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

      if (params.chapter) {
        paths.push(`/chapter/${params.chapter}`);
      }
    }

    const query = qs.stringify({
      ...params,
      category: undefined,
      author: undefined,
      book: undefined,
      chapter: undefined,
    });

    if (query) {
      paths.push(`?${query}`);
    }

    return `/blog${paths.join('')}`;
  },

  sermons: () => routes.blog({ category: 1 }),
  post: id => `/blog/post/${id}`,
  church: () => routes.aboutUs(),
  aboutUs: () => '/qui-sommes-nous',
  ourFaith: () => '/que-croyons-nous',
  worship: () => '/le-culte',
  activity: () => '/activites',
  team: () => '/l-equipe',
  federativeLinks: () => '/liens-federatifs',
  contact: () => '/contact',
  discover: () => '/decouvrir',
  gift: () => '/don',
};

const getAbsoluteUrl = path => `${config.protocol}://${config.host}${path}`;

export { routes as default, getAbsoluteUrl };
