import { getCategoriesByParentSlug } from 'utils/categories';

const LOAD = 'BOOKS_LOAD';

const initialState = {
  loaded: false,
  data: [],
};

function parseBookSlug(slug) {
  const [, book, chapter, verse] = slug.match(/(\w+)(?:\-(\d+)?)?(?:\-(\d+))?$/) || [];

  return [book, chapter, verse];
}

function getChapterNumber(slug) {
  return parseInt(parseBookSlug(slug)[1], 10);
}

function getVerseNumber(slug) {
  return parseInt(parseBookSlug(slug)[2], 10);
}

export default function (state = initialState, action = {}) {
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

    const { entities: { categories = {} } } = state;

    const books = getCategoriesByParentSlug(categories, 'books').map(book => {
      const [, testament, name] = book.name.match(/^#(\d)\.\d+ (.*)$/);

      return {
        key: book.slug,
        label: name,
        testament: (testament === '2' ? 'new' : 'old'),
        chapters: getCategoriesByParentSlug(categories, book.slug).map(chapter => ({
          number: getChapterNumber(chapter.slug),
          label: chapter.name,
          verses: getCategoriesByParentSlug(categories, chapter.slug).map(verse => ({
            number: getVerseNumber(verse.slug),
            label: verse.name,
          })),
        })),
      };
    });

    return dispatch({
      type: LOAD,
      books,
    });
  };
}
