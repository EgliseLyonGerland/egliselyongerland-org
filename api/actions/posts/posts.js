import data from './data';

import { get, find, indexOf, random } from 'lodash';

function postHasAllCagtegories(post, categoriesID) {
  const postCategories = get(post, 'terms.category', []);

  const categoriesMatched = postCategories.reduce((total, category) => {
    if (indexOf(categoriesID, category.ID + '') > -1) {
      return total + 1;
    }

    return total;
  }, 0);

  return categoriesMatched == categoriesID.length;
}

export default function posts({ query }) {
  return new Promise((resolve, reject) => {
    const {
      page = 1,
      filter = {},
    } = query;

    const {
      posts_per_page = 15,
      category__and,
    } = filter;

    let results = data;

    // Filter by categories
    if (category__and) {
      results = results.reduce((previous, current) => {
        if (postHasAllCagtegories(current, category__and)) {
          previous.push(current);
        }

        return previous;
      }, []);
    }

    // Pagination
    results = results.slice(
      ((page - 1) * posts_per_page),
      (page * posts_per_page)
    );

    setTimeout(() => {
      resolve(results);
    }, random(0, 200) * 10);
  });
}
