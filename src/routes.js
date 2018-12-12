import loadable from 'react-loadable';
import App from 'containers/App/App';
import Home from 'containers/Home/HomeConnector';
import Blog from 'containers/Blog/BlogConnector';
import Post from 'containers/Post/PostConnector';
import churchTabs from './shared/config/church-tabs';

const blogRoutes = [
  '/blog',
  '/blog/category/:category',
  '/blog/category/:category/author/:author',
  '/blog/category/:category/author/:author/book/:book',
  '/blog/category/:category/author/:author/book/:book/chapter/:chapter',
  '/blog/category/:category/author/:author/book/:book/chapter/:chapter/verse/:verse',
  '/blog/category/:category/book/:book',
  '/blog/category/:category/book/:book/chapter/:chapter',
  '/blog/category/:category/book/:book/chapter/:chapter/verse/:verse',
  '/blog/author/:author',
  '/blog/author/:author/book/:book',
  '/blog/author/:author/book/:book/chapter/:chapter',
  '/blog/author/:author/book/:book/chapter/:chapter/verse/:verse',
  '/blog/book/:book',
  '/blog/book/:book/chapter/:chapter',
  '/blog/book/:book/chapter/:chapter/verse/:verse',
];

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: `/(${churchTabs.map(({ slug }) => slug).join('|')})`,
        component: loadable({
          loader: () =>
            import(/* webpackChunkName: "church" */ 'containers/Church/Church'),
          loading: () => null,
        }),
        routes: churchTabs.map(({ slug, component }) => ({
          path: `/${slug}`,
          component,
          exact: true,
        })),
      },
      ...blogRoutes.map(path => ({
        path,
        exact: true,
        component: Blog,
      })),
      {
        path: '/blog/post/:postId',
        component: Post,
      },
      {
        path: '/contact',
        exact: true,
        component: loadable({
          loader: () =>
            import(/* webpackChunkName: "contact" */ 'containers/Contact/Contact'),
          loading: () => null,
        }),
      },
      {
        path: '/decouvrir',
        exact: true,
        component: loadable({
          loader: () =>
            import(/* webpackChunkName: "discover" */ 'containers/Discover/Discover'),
          loading: () => null,
        }),
      },
      {
        path: '*',
        component: loadable({
          loader: () =>
            import(/* webpackChunkName: "notFound" */ 'containers/NotFound/NotFound'),
          loading: () => null,
        }),
        status: 404,
      },
    ],
  },
];

export default routes;
