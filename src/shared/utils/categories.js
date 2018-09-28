import { toArray } from 'lodash';

export function getCategoryBySlug(categories, slug) {
  return toArray(categories).reduce((previous, current) => {
    if (current.slug === slug) {
      return current;
    }

    return previous;
  }, null);
}

export function getCategoriesByParentSlug(categories, parentSlug) {
  const parentCategory = getCategoryBySlug(categories, parentSlug);

  if (!parentCategory) {
    return null;
  }

  return toArray(categories).reduce((previous, current) => {
    if (current.parent === parentCategory.ID) {
      previous.push(current);
    }

    return previous;
  }, []);
}
