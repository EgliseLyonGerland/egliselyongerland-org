import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";
import { has, reduce } from "lodash";
import { TransitionMotion, spring } from "react-motion";
import randomcolor from "randomcolor";
import { denormalize } from "normalizr";

import { load as loadPosts } from "redux/actions/posts";
import routes from "utils/routes";
import { postSchema } from "redux/schemas";

import Helmet from "react-helmet";

import {
  Jumbotron,
  PickerPanel,
  BiblePicker,
  LabelPicker,
  PopButton,
  PostsFeed,
  BlankItemsFeed,
  Container,
  Text,
  Hr
} from "components";

import jumbotron from "./jumbotron.jpg";

const POSTS_KEY = "blog";
const LIMIT = 10;

@asyncConnect([
  {
    promise: ({ params, location: { query }, store: { dispatch } }) => {
      const filters = {
        limit: LIMIT,
        aggs: 1
      };

      if (has(params, "category")) {
        filters.category = params.category;
      }

      if (has(params, "author")) {
        filters.author = params.author;
      }

      if (has(params, "book")) {
        filters.book = params.book;

        if (has(query, "chapter")) {
          filters.chapter = query.chapter;

          if (has(query, "verse")) {
            filters.verse = query.verse;
          }
        }
      }

      if (has(query, "page")) {
        filters.from = (query.page - 1) * LIMIT;
      }

      const result = dispatch(loadPosts(POSTS_KEY, filters));

      return __CLIENT__ ? null : result;
    }
  }
])
@connect((state, { params }) => {
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

  const entities = state.entities;
  const browser = state.browser;
  const location = state.routing.locationBeforeTransitions;

  return {
    page,
    maxPage,
    total,
    posts,
    aggs,
    loading,
    entities,
    browser,
    location,
    params: { ...params, ...location.query }
  };
})
export default class Blog extends Component {
  static propTypes = {
    page: PropTypes.number,
    maxPage: PropTypes.number,
    total: PropTypes.number,
    posts: PropTypes.array,
    aggs: PropTypes.object,
    loading: PropTypes.bool,
    browser: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object
  };

  getDenormalizedPosts() {
    const { posts, entities } = this.props;

    return denormalize(posts, [postSchema], entities);
  }

  renderBibleFilter() {
    const { loading, params, aggs: { bibleRefs = null } } = this.props;

    const { router } = this.context;

    if (!bibleRefs || !bibleRefs.length) {
      return null;
    }

    return (
      <PickerPanel title="Référence biblique">
        <BiblePicker
          books={bibleRefs}
          readOnly={loading}
          currentBook={parseInt(params.book, 10)}
          currentChapter={parseInt(params.chapter, 10)}
          currentVerse={parseInt(params.verse, 10)}
          onChange={data => {
            router.push(routes.blog({ ...params, ...data, page: undefined }));
          }}
        />
      </PickerPanel>
    );
  }

  renderCategoriesFilter() {
    const { loading, params, aggs: { categories = null } } = this.props;

    const { router } = this.context;

    if (categories === null) {
      return null;
    }

    const readOnly = loading || (categories.length === 1 && !params.category);

    return (
      <PickerPanel title="Catégorie">
        <LabelPicker
          crop={10}
          readOnly={readOnly}
          current={parseInt(params.category, 10)}
          labels={categories.map(category => ({
            key: category.id,
            label: category.name,
            total: category.total
          }))}
          onChange={key =>
            router.push(
              routes.blog({ ...params, page: undefined, category: key })
            )}
        >
          {label => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label}{" "}
              <Text fontSize={0.8} element="span" color="#AAA">
                ({label.total})
              </Text>
            </Text>
          )}
        </LabelPicker>
      </PickerPanel>
    );
  }

  renderAuthorsFilter() {
    const { loading, params, aggs: { authors = null } } = this.props;

    const { router } = this.context;

    if (authors === null) {
      return null;
    }

    const readOnly = loading || (authors.length === 1 && !params.author);

    return (
      <PickerPanel title="Auteur">
        <LabelPicker
          crop={10}
          readOnly={readOnly}
          current={parseInt(params.author, 10)}
          labels={authors.map(author => ({
            key: author.id,
            label: author.name,
            total: author.total
          }))}
          onChange={key =>
            router.push(
              routes.blog({ ...params, page: undefined, author: key })
            )}
        >
          {label => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label}{" "}
              <Text fontSize={0.8} element="span" color="#AAA">
                ({label.total})
              </Text>
            </Text>
          )}
        </LabelPicker>
      </PickerPanel>
    );
  }

  renderSearchFilter() {
    return (
      <div>
        <input
          className="form-control"
          type="text"
          placeholder="Saisissez votre recherche"
        />
      </div>
    );
  }

  renderFilters() {
    const { aggs } = this.props;

    if (aggs === null) {
      return <Text>Chargement...</Text>;
    }

    const filters = [
      // this.renderSearchFilter(),
      this.renderCategoriesFilter(),
      this.renderAuthorsFilter(),
      this.renderBibleFilter()
    ];

    return (
      <div>
        {filters.map(
          (filter, index) =>
            filter ? (
              <div key={index}>
                {filter}
                <Hr lg />
              </div>
            ) : null
        )}
      </div>
    );
  }

  renderPosts() {
    const { loading, location: { query } } = this.props;

    const posts = this.getDenormalizedPosts();

    if (loading) {
      return (
        <BlankItemsFeed
          items={7}
          color={randomcolor({ luminosity: "light", seed: query.key })}
        />
      );
    }

    if (posts.length) {
      return <PostsFeed posts={posts} />;
    }

    return (
      <Text>
        <i>Aucun résultat</i>
      </Text>
    );
  }

  renderNavigation() {
    const { total, page, maxPage, params } = this.props;
    const { router } = this.context;

    return (
      <div>
        <div className="pull-left">
          <button className="btn" disabled>
            <small>
              {total} {total > 1 ? "articles" : "article"}
            </small>
          </button>
          <button className="btn" disabled>
            <small>
              page {page}/{maxPage}
            </small>
          </button>
        </div>
        <div className="pull-right">
          <button
            disabled={page <= 1}
            className="btn fa fa-angle-left"
            onClick={() =>
              router.push(routes.blog({ ...params, page: page - 1 }))}
          />
          <button
            disabled={page >= maxPage}
            className="btn fa fa-angle-right"
            onClick={() =>
              router.push(routes.blog({ ...params, page: page + 1 }))}
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
        <div className="col-xs-5">{this.renderFilters()}</div>
        <div className="col-xs-7">
          {this.renderNavigation()}

          <TransitionMotion
            styles={[
              {
                key: `${location.key}`,
                data: posts,
                style: { x: spring(0) }
              }
            ]}
            willEnter={() => ({ x: 110 })}
            willLeave={() => ({ x: spring(-110) })}
          >
            {interpolatedStyles => (
              <div
                style={{
                  width: "100%",
                  whiteSpace: "nowrap",
                  overflowX: "hidden"
                }}
              >
                {interpolatedStyles.map(({ key, style, data }, index) => (
                  <div
                    key={key}
                    style={{
                      width: "100%",
                      whiteSpace: "normal",
                      display: "inline-block",
                      verticalAlign: "top",
                      transform: `translateX(${style.x - index * 100}%)`
                    }}
                  >
                    {data}
                  </div>
                ))}
              </div>
            )}
          </TransitionMotion>
        </div>
      </div>
    );
  }

  renderSmallScreen() {
    return (
      <div>
        {this.renderPosts()}
        <PopButton title="Filtres">{this.renderFilters()}</PopButton>
      </div>
    );
  }

  render() {
    const { browser } = this.props;

    const {
      params: { category = null },
      aggs: { categories = null }
    } = this.props;

    const title = reduce(
      categories,
      (prev, curr) => {
        if (curr.id === parseInt(category, 10)) {
          return curr.name;
        }

        return prev;
      },
      "Blog"
    );

    return (
      <div>
        <Helmet title={title} />
        <Jumbotron title={title} background={jumbotron} />
        <Hr xl />
        <Container md>
          {browser.width >= 750
            ? this.renderWideScreen()
            : this.renderSmallScreen()}
        </Container>
      </div>
    );
  }
}
