import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { has, transform } from 'lodash';
import { TransitionMotion, spring } from 'react-motion';

import { load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import {
  PickerPanel,
  BiblePicker,
  LabelPicker,
  PopButton,
  PostsFeed,
  BlankItemsFeed,
  Container,
  Text,
  H1,
  Hr
} from 'components';

const POSTS_KEY = 'blog';
const LIMIT = 10;

@asyncConnect([{
  promise: ({ location: { query }, store: { dispatch } }) => {
    const filters = {
      limit: LIMIT,
      aggs: 1,
    };

    if (has(query, 'category')) {
      filters.category = query.category;
    }

    if (has(query, 'author')) {
      filters.author = query.author;
    }

    if (has(query, 'book')) {
      filters.book = query.book;

      if (has(query, 'chapter')) {
        filters.chapter = query.chapter;

        if (has(query, 'verse')) {
          filters.verse = query.verse;
        }
      }
    }

    if (has(query, 'page')) {
      filters.from = (query.page - 1) * LIMIT;
    }

    const result = dispatch(loadPosts(POSTS_KEY, filters));

    return __CLIENT__ ? null : result;
  }
}])
@connect(
  state => {
    let page = 1;
    let maxPage = 1;
    let total = 0;
    let posts = null;
    let aggs = {};
    let loading = false;

    if (state.posts[POSTS_KEY]) {
      total = state.posts[POSTS_KEY].total;
      posts = state.posts[POSTS_KEY].data;
      aggs = state.posts[POSTS_KEY].aggs;
      loading = state.posts[POSTS_KEY].loading;
      page = Math.ceil(state.posts[POSTS_KEY].from / LIMIT) + 1;
      maxPage = Math.ceil(total / LIMIT);
    }

    const browser = state.browser;
    const location = state.routing.locationBeforeTransitions;

    return {
      page,
      maxPage,
      total,
      posts,
      aggs,
      loading,
      browser,
      location,
    };
  }
)
export default
class Blog extends Component {

  static propTypes = {
    page: PropTypes.number,
    maxPage: PropTypes.number,
    total: PropTypes.number,
    posts: PropTypes.array,
    aggs: PropTypes.object,
    loading: PropTypes.bool,
    browser: PropTypes.object,
    location: PropTypes.object,
  }

  static contextTypes = {
    router: PropTypes.object,
  }

  goTo(params) {
    const { router } = this.context;

    router.push(router.createPath('/blog', transform(params, (prev, curr, key) => {
      if (curr !== null) {
        prev[key] = curr; // eslint-disable-line no-param-reassign
      }
    }, {})));
  }

  renderBibleFilter() {
    const {
      loading,
      location: { query },
      aggs: { bibleRefs = null },
    } = this.props;

    if (!bibleRefs || !bibleRefs.length) {
      return null;
    }

    return (
      <PickerPanel title="Référence biblique">
        <BiblePicker
          books={bibleRefs}
          readOnly={loading}
          currentBook={parseInt(query.book, 10)}
          currentChapter={parseInt(query.chapter, 10)}
          currentVerse={parseInt(query.verse, 10)}
          onChange={params => {
            this.goTo({ ...query, ...params, page: null });
          }}
        />
      </PickerPanel>
    );
  }

  renderCategoriesFilter() {
    const {
      loading,
      aggs: { categories = null },
      location: { query },
    } = this.props;

    if (categories === null) {
      return null;
    }

    const readOnly = loading || (categories.length === 1 && !query.category);

    return (
      <PickerPanel title="Catégorie">
        <LabelPicker
          crop={10}
          readOnly={readOnly}
          current={parseInt(query.category, 10)}
          labels={categories.map(category => ({
            key: category.id,
            label: category.name,
            total: category.total,
          }))}
          onChange={key => this.goTo({ ...query, page: null, category: key })}
        >
          {label =>
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label} <Text fontSize={0.8} element="span" color="#AAA">({label.total})</Text>
            </Text>
          }
        </LabelPicker>
      </PickerPanel>
    );
  }

  renderAuthorsFilter() {
    const {
      loading,
      aggs: { authors = null },
      location: { query },
    } = this.props;

    if (authors === null) {
      return null;
    }

    const readOnly = loading || (authors.length === 1 && !query.author);

    return (
      <PickerPanel title="Auteur">
        <LabelPicker
          crop={10}
          readOnly={readOnly}
          current={parseInt(query.author, 10)}
          labels={authors.map(author => ({
            key: author.id,
            label: author.name,
            total: author.total,
          }))}
          onChange={key => this.goTo({ ...query, page: null, author: key })}
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

    const filters = [
      this.renderSearchFilter(),
      this.renderCategoriesFilter(),
      this.renderAuthorsFilter(),
      this.renderBibleFilter(),
    ];

    return (
      <div>
        {filters.map((filter, index) => (filter ? (
          <div key={index}>
            {filter}
            <Hr lg />
          </div>
        ) : null))}
      </div>
    );
  }

  renderPosts() {
    const { posts, loading } = this.props;

    if (loading) {
      return <BlankItemsFeed items={5} />;
    }

    if (posts.length) {
      return <PostsFeed posts={posts} />;
    }

    return <Text><i>Aucun résultat</i></Text>;
  }

  renderNavigation() {
    const { total, page, maxPage, location: { query } } = this.props;

    return (
      <div>
        <div className="pull-left">
          <button className="btn" disabled>
            <small>{total} {total > 1 ? 'articles' : 'article'}</small>
          </button>
          <button className="btn" disabled>
            <small>page {page}/{maxPage}</small>
          </button>
        </div>
        <div className="pull-right">
          <button
            disabled={page <= 1}
            className="btn fa fa-angle-left"
            onClick={() => this.goTo({ ...query, page: page - 1 })}
          />
          <button
            disabled={page >= maxPage}
            className="btn fa fa-angle-right"
            onClick={() => this.goTo({ ...query, page: page + 1 })}
          />
        </div>
        <div className="clearfix" />
        <Hr />
      </div>
    );
  }

  renderWideScreen() {
    const { location } = this.props;
    const posts = this.renderPosts();

    return (
      <div className="row">
        <div className="col-xs-5">
          {this.renderFilters()}
        </div>
        <div className="col-xs-7">
          {this.renderNavigation()}

          <TransitionMotion
            styles={[{
              key: location.key,
              data: posts,
              style: { x: spring(0) },
            }]}
            willEnter={() => ({ x: 110 })}
            willLeave={() => ({ x: spring(-110) })}
          >
            {interpolatedStyles =>
              <div style={{ width: '100%', whiteSpace: 'nowrap', overflowX: 'hidden' }}>
                {interpolatedStyles.map(({ key, style, data }, index) =>
                  <div
                    key={key}
                    style={{
                      width: '100%',
                      whiteSpace: 'normal',
                      display: 'inline-block',
                      verticalAlign: 'top',
                      transform: `translateX(${style.x - (index * 100)}%)`
                    }}
                  >
                    {data}
                  </div>
                )}
              </div>
            }
          </TransitionMotion>
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
