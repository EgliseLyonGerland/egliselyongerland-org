import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { has, eq, transform } from 'lodash';

import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import {
  PickerPanel,
  BiblePicker,
  LabelPicker,
  PopButton,
  PostsFeed,
  Container,
  Spinner,
  Text,
  H1,
  Hr
} from 'components';

const POSTS_KEY = 'blog';

@asyncConnect([{
  promise: ({ location: { query }, store: { dispatch } }) => {
    const filters = {
      aggs: true,
    };

    if (has(query, 'category')) {
      filters.category = query.category;
    }

    if (has(query, 'author')) {
      filters.author = query.author;
    }

    const result = dispatch(loadPosts(POSTS_KEY, filters));

    return __CLIENT__ ? null : result;
  }
}])
@connect(
  state => {
    let posts = null;
    let aggs = null;

    if (isPostsLoaded(POSTS_KEY, state)) {
      posts = state.posts[POSTS_KEY].data;
      aggs = state.posts[POSTS_KEY].aggs;
    }

    return {
      posts,
      aggs,
      browser: state.browser,
    };
  }
)
export default
class Blog extends Component {

  static propTypes = {
    posts: PropTypes.array,
    aggs: PropTypes.object,
    types: PropTypes.array,
    currentType: PropTypes.object,
    currentBook: PropTypes.string,
    currentChapter: PropTypes.number,
    currentVerse: PropTypes.number,
    browser: PropTypes.object,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  goTo(params) {
    const { router } = this.context;
    const { location: { query } } = this.props;

    router.push(router.createPath('/blog', transform(params, (prev, curr, key) => {
      if (!query[key] || eq(query[key], curr)) {
        prev[key] = curr; // eslint-disable-line no-param-reassign
      }
    }, {})));
  }

  renderBibleFilter() {
    // const { books, currentType, currentBook, currentChapter, currentVerse } = this.props;
    // const { router } = this.context;

    const { aggs: { bibleRefs } } = this.props;

    return (
      <PickerPanel title="Référence biblique">
        <BiblePicker
          books={bibleRefs}
        />
      </PickerPanel>
    );
    // {...{ currentBook, currentChapter, currentVerse }}
    // onChange={({ book, chapter, verse }) => router.push(this.generateUrl({
    //   type: currentType && currentType.slug,
    //   book: (currentBook === book && !chapter && !verse ? null : book),
    //   chapter: (currentChapter === chapter && !verse ? null : chapter),
    //   verse: (currentVerse === verse ? null : verse),
    // }))}
  }

  renderCategoriesFilter() {
    const {
      aggs: { categories },
      location: { query },
    } = this.props;

    return (
      <PickerPanel title="Catégories">
        <LabelPicker
          current={parseInt(query.category, 10)}
          labels={categories.map(category => ({
            key: category.id,
            label: category.name,
            total: category.total,
          }))}
          onChange={label => this.goTo({ ...query, category: label.key })}
        >
          {(label) => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label} <Text fontSize={0.8} element="span" color="#AAA">({label.total})</Text>
            </Text>
          )}
        </LabelPicker>
      </PickerPanel>
    );
  }

  renderAuthorsFilter() {
    const {
      aggs: { authors },
      location: { query },
    } = this.props;

    return (
      <PickerPanel title="Auteurs">
        <LabelPicker
          current={parseInt(query.author, 10)}
          labels={authors.map(author => ({
            key: author.id,
            label: author.name,
            total: author.total,
          }))}
          onChange={label => this.goTo({ ...query, author: label.key })}
        >
          {(label) => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label} <Text fontSize={0.8} element="span" color="#AAA">({label.total})</Text>
            </Text>
          )}
        </LabelPicker>
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
    const { aggs } = this.props;

    if (aggs === null) {
      return (<Text>Chargement...</Text>);
    }

    return (
      <div>
        {this.renderSearchFilter()}
        <Hr lg />
        {this.renderCategoriesFilter()}
        <Hr lg />
        {this.renderAuthorsFilter()}
        <Hr lg />
        {this.renderBibleFilter()}
      </div>
    );
  }

  renderPosts() {
    const { posts } = this.props;

    if (!posts) {
      return (<Spinner />);
    }

    if (!posts.length) {
      return (<Text><i>Aucun résultat</i></Text>);
    }

    return <PostsFeed posts={posts} />;
  }

  renderWideScreen() {
    return (
      <div className="row">
        <div className="col-xs-5">
          {this.renderFilters()}
        </div>
        <div className="col-xs-7">
          {this.renderPosts()}
        </div>
      </div>
    );
  }

  renderSmallScreen() {
    return (
      <div>
        {this.renderPosts()}
        <PopButton title="Filtres">
          {this.renderFilters()}
        </PopButton>
      </div>
    );
  }

  render() {
    const { browser } = this.props;

    return (
      <div>
        <Helmet title="Accueil" />
        <Hr />
        <Container md>
          <H1>Blog</H1>
          <Hr lg />

          {browser.width >= 750 ? this.renderWideScreen() : this.renderSmallScreen()}
        </Container>
      </div>
    );
  }
}
