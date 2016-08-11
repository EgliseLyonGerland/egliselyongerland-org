import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { toArray } from 'lodash';

import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';
import { isLoaded as isCategoriesLoaded, load as loadCategories } from 'redux/modules/categories';
import { loadFromCategories as loadBooks } from 'redux/modules/books';
import { getCategoryBySlug } from 'utils/categories';

import Helmet from 'react-helmet';

import {
  PickerPanel,
  BiblePicker,
  LabelPicker,
  Container, Image, Spinner,
  Text, H1, Hr } from 'components';

const POSTS_KEY = 'blog';

function parseBookSlug(slug) {
  const [, book, chapter, verse] = slug.match(/(\w+)(?:\-(\d+)?)?(?:\-(\d+))?$/) || [];

  return [book, chapter, verse];
}

@asyncConnect([{
  deferred: true,
  promise: ({ params, store: { dispatch, getState } }) => { // eslint-disable-line arrow-body-style
    const result = dispatch(loadCategories())
      .then(() => dispatch(loadBooks()))
      .then(() => {
        const { typeSlug, bookSlug } = params;
        const { entities: { categories } } = getState();
        const filters = { limit: 15, categories: [] };

        if (typeSlug) {
          const currentType = getCategoryBySlug(toArray(categories), typeSlug);

          if (currentType) {
            filters.categories.push(currentType.ID);
          }
        }

        if (bookSlug) {
          const bookType = getCategoryBySlug(toArray(categories), bookSlug);

          if (bookType) {
            filters.categories.push(bookType.ID);
          }
        }

        return dispatch(loadPosts(POSTS_KEY, filters));
      });

    return __CLIENT__ ? null : result;
  }
}])
@connect(
  (state, props) => {
    const { entities, books } = state;
    const { params } = props; // eslint-disable-line react/prop-types

    let posts = null;
    let types = null;
    let currentType = null;
    let currentBook = null;
    let currentChapter = null;
    let currentVerse = null;

    if (isPostsLoaded(POSTS_KEY, state)) {
      posts = state.posts[POSTS_KEY].data.map(id => entities.posts[id]);
    }

    if (isCategoriesLoaded(state)) {
      const categories = state.categories.data.map(id => entities.categories[id]);

      types = categories.filter(({ parent, count }) => count > 0 && parent === 10);

      currentType = getCategoryBySlug(categories, params.typeSlug);
    }

    if (params.bookSlug) {
      [currentBook, currentChapter, currentVerse] = parseBookSlug(params.bookSlug);
    }

    return {
      posts,
      types,
      books: books.data,
      currentType,
      currentBook,
      currentChapter: parseInt(currentChapter, 10),
      currentVerse: parseInt(currentVerse, 10),
    };
  }
)
export default
class Blog extends Component {

  static propTypes = {
    posts: PropTypes.array,
    types: PropTypes.array,
    books: PropTypes.array,
    currentType: PropTypes.object,
    currentBook: PropTypes.string,
    currentChapter: PropTypes.number,
    currentVerse: PropTypes.number,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  generateUrl({ type, book, chapter, verse }) {
    let bookSlug;

    if (book) {
      bookSlug = book;

      if (chapter) {
        bookSlug += `-${chapter}`;

        if (verse) {
          bookSlug += `-${verse}`;
        }
      }
    }

    let url = '/blog';
    url += (type ? `/category/${type}` : '');
    url += (bookSlug ? `/book/${bookSlug}` : '');

    return url;
  }

  renderPosts() {
    const { posts } = this.props;

    if (!posts) {
      return (<Spinner />);
    }

    if (!posts.length) {
      return (<Text><i>Aucun résultat</i></Text>);
    }

    return posts.map((post, index) =>
      <div key={post.ID}>
        <div className="row">
          <div className="col-xs-5">
            <Image src={post.featured_image.attachment_meta.sizes.medium.url} />
          </div>
          <div className="col-xs-7">
            <Text fontSize={1.6} fontWeight="regular">{post.title}</Text>
            <Hr />
            <Text fontSize={1.2} maxLines={4} fadeLastLine>{post.excerpt}</Text>
          </div>
        </div>
        {((index + 1) < posts.length) && (<Hr line lg />)}
      </div>
    );
  }

  renderBibleFilter() {
    const { books, currentType, currentBook, currentChapter, currentVerse } = this.props;
    const { router } = this.context;

    return (
      <PickerPanel title="Référence biblique">
        <BiblePicker
          books={books}
          {...{ currentBook, currentChapter, currentVerse }}
          onChange={({ book, chapter, verse }) => router.push(this.generateUrl({
            type: currentType && currentType.slug,
            book: (currentBook === book && !chapter && !verse ? null : book),
            chapter: (currentChapter === chapter && !verse ? null : chapter),
            verse: (currentVerse === verse ? null : verse),
          }))}
        />
      </PickerPanel>
    );
  }

  renderCategoriesFilter() {
    const { types, currentType, currentBook, currentChapter, currentVerse } = this.props;
    const { router } = this.context;

    return (
      <PickerPanel title="Catégories">
        <LabelPicker
          current={currentType && currentType.slug}
          labels={types.map(type => ({ key: type.slug, label: type.name }))}
          onChange={label => router.push(this.generateUrl({
            type: (currentType && currentType.slug === label.key ? null : label.key),
            book: currentBook,
            chapter: currentChapter,
            verse: currentVerse,
          }))}
        />
      </PickerPanel>
    );
  }

  renderSearchFilter() {
    return (
      <div>
        <input className="form-control" type="text" placeholder="Saisissez votre recherche" />
      </div>
    );
  }

  renderFilters() {
    const { types, books } = this.props;

    if (!types || !books) {
      return (<Text>Chargement...</Text>);
    }

    return (
      <div>
        {this.renderSearchFilter()}
        <Hr lg />
        {this.renderCategoriesFilter()}
        <Hr lg />
        {this.renderBibleFilter()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Helmet title="Accueil" />
        <Hr />
        <Container>
          <H1>Blog</H1>
          <Hr lg />

          <div className="row">
            <div className="col-xs-4">
              {this.renderFilters()}
            </div>
            <div className="col-xs-8">
              {this.renderPosts()}
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
