import { App, Blog, Church, Contact, Home, NotFound, Post } from "containers";

import churchTabs from "./shared/config/church-tabs";

const blogRoutes = [
  "/blog",
  "/blog/category/:category",
  "/blog/category/:category/author/:author",
  "/blog/category/:category/author/:author/book/:book",
  "/blog/category/:category/author/:author/book/:book/chapter/:chapter",
  "/blog/category/:category/author/:author/book/:book/chapter/:chapter/verse/:verse",
  "/blog/category/:category/book/:book",
  "/blog/category/:category/book/:book/chapter/:chapter",
  "/blog/category/:category/book/:book/chapter/:chapter/verse/:verse",
  "/blog/author/:author",
  "/blog/author/:author/book/:book",
  "/blog/author/:author/book/:book/chapter/:chapter",
  "/blog/author/:author/book/:book/chapter/:chapter/verse/:verse",
  "/blog/book/:book",
  "/blog/book/:book/chapter/:chapter",
  "/blog/book/:book/chapter/:chapter/verse/:verse"
];

const routes = [
  {
    component: App,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      ...churchTabs.map(({ slug, component }) => ({
        component: Church,
        path: `/${slug}`,
        routes: [
          {
            path: `/${slug}`,
            component,
            exact: true
          }
        ]
      })),
      ...blogRoutes.map(path => ({
        path,
        exact: true,
        component: Blog
      })),
      {
        path: "/blog/post/:postId",
        component: Post
      },
      {
        path: "/contact",
        exact: true,
        component: Contact
      },
      {
        path: "*",
        component: NotFound,
        status: 404
      }
    ]
  }
];

export default routes;
