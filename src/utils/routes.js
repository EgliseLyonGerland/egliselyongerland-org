import qs from "qs";

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
    }

    const query = qs.stringify({
      ...params,
      category: undefined,
      author: undefined,
      book: undefined
    });

    if (query) {
      paths.push(`?${query}`);
    }

    return `/blog${paths.join("")}`;
  },

  sermons: () => routes.blog({ category: 1 }),
  post: id => `/blog/post/${id}`,
  church: () => routes.aboutUs(),
  aboutUs: () => "/qui-sommes-nous",
  ourFaith: () => "/que-croyons-nous",
  worship: () => "/le-culte",
  activity: () => "/activites",
  team: () => "/l-equipe",
  federativeLinks: () => "/liens-federatifs",
  contact: () => "/contact"
};

export default routes;
