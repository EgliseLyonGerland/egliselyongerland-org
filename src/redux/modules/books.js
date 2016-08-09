import { getCategoriesByParentSlug } from 'utils/categories';

const LOAD = 'BOOKS_LOAD';

const initialState = {
  loaded: false,
  data: [],
};

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: true,
        data: action.books,
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.books.loaded;
}

export function loadFromCategories() {
  return (dispatch, getState) => {
    const state = getState();

    if (isLoaded(state)) {
      return Promise.resolve();
    }

    const { entities: { categories = {}}} = state;

    const books = getCategoriesByParentSlug(categories, 'books').map(book => {
      const [, testament, name] = book.name.match(/^#(\d)\.\d+ (.*)$/);

      return {
        key: book.slug,
        label: name,
        testament: (testament === '2' ? 'new' : 'old'),
        chapters: getCategoriesByParentSlug(categories, book.slug).map(chapter => ({
          number: 1,
          label: chapter.name,
          verses: getCategoriesByParentSlug(categories, chapter.slug).map(verse => ({
            number: 1,
            label: verse.name,
          })),
        })),
      };
    });

    dispatch({
      type: LOAD,
      books,
    });
  };
}
