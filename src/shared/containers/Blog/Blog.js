import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";
import { get, has, reduce } from "lodash";
import { TransitionMotion, spring } from "react-motion";
import { denormalize } from "normalizr";
import Grid from "@material-ui/core/Grid";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { load as loadPosts } from "store/actions/posts";
import routes from "utils/routes";
import { postSchema } from "store/schemas";
import Button from "components/Button/Button";

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

const asyncPromises = [
  {
    promise: ({
      match: { params },
      location: { search },
      store: { dispatch }
    }) => {
      const query = new URLSearchParams(search);

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

        if (has(params, "chapter")) {
          filters.chapter = params.chapter;

          if (query.has("verse")) {
            filters.verse = query.get("verse");
          }
        }
      }

      if (query.has("page")) {
        filters.from = (query.get("page") - 1) * LIMIT;
      }

      const result = dispatch(loadPosts(POSTS_KEY, filters));

      return __CLIENT__ ? null : result;
    }
  }
];

const mapStateToProps = (state, { match: { params, search } }) => {
  const query = new URLSearchParams(search);

  const { from = 0, total = 1, data = null, aggs = {}, loading = false } = get(
    state.posts,
    POSTS_KEY,
    {}
  );

  const page = Math.ceil(from / LIMIT) + 1;
  const maxPage = Math.ceil(total / LIMIT);
  const entities = state.entities;
  const browser = state.browser;

  return {
    page,
    maxPage,
    total,
    posts: data,
    aggs,
    loading,
    entities,
    browser,
    params: { ...params, ...query }
  };
};

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
    params: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object
  };

  getDenormalizedPosts() {
    const { posts, entities } = this.props;

    return denormalize(posts, [postSchema], entities);
  }

  getTitle() {
    const {
      params: { category = null },
      aggs: { categories = null }
    } = this.props;

    return reduce(
      categories,
      (prev, curr) => {
        if (curr.id === parseInt(category, 10)) {
          return curr.name;
        }

        return prev;
      },
      "Blog"
    );
  }

  renderBibleFilter() {
    const {
      loading,
      params,
      aggs: { bibleRefs = null },
      history
    } = this.props;

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
            history.push(routes.blog({ ...params, ...data, page: undefined }));
          }}
        />
      </PickerPanel>
    );
  }

  renderCategoriesFilter() {
    const {
      loading,
      params,
      aggs: { categories = null },
      history
    } = this.props;

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
            history.push(
              routes.blog({ ...params, page: undefined, category: key })
            )
          }
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
    const {
      loading,
      params,
      aggs: { authors = null },
      history
    } = this.props;

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
            history.push(
              routes.blog({ ...params, page: undefined, author: key })
            )
          }
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
    const { loading } = this.props;

    const posts = this.getDenormalizedPosts();

    if (loading) {
      return <BlankItemsFeed items={7} color="#4776e6" />;
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
    const { total, page, maxPage, params, history } = this.props;

    return (
      <Fragment>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            {total} {total > 1 ? "articles" : "article"}
            <Hr inline />
            page {page}/{maxPage}
          </Grid>
          <Grid item>
            <Button
              type="icon"
              mode="ghost"
              disabled={page <= 1}
              onClick={() =>
                history.push(routes.blog({ ...params, page: page - 1 }))
              }
            >
              <ChevronLeftIcon />
            </Button>
            <Hr multiplier={1} inline />
            <Button
              type="icon"
              mode="ghost"
              disabled={page >= maxPage}
              onClick={() =>
                history.push(routes.blog({ ...params, page: page + 1 }))
              }
            >
              <ChevronRightIcon />
            </Button>
          </Grid>
        </Grid>
        <Hr />
      </Fragment>
    );
  }

  renderWideScreen() {
    const {
      location: { pathname, search }
    } = this.props;
    const posts = this.renderPosts();

    return (
      <div className="row">
        <div className="col-xs-5">{this.renderFilters()}</div>
        <div className="col-xs-7">
          {this.renderNavigation()}

          <TransitionMotion
            styles={[
              {
                key: pathname + search,
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

  renderSeo(title) {
    const { page, maxPage, params } = this.props;

    const props = {
      title,
      link: [],
      meta: []
    };

    if (page > 1) {
      props.link.push({
        rel: "prev",
        href: routes.blog({ ...params, page: page - 1 })
      });

      props.meta.push({ name: "robots", content: "noindex" });
    }

    if (page < maxPage) {
      props.link.push({
        rel: "next",
        href: routes.blog({ ...params, page: page + 1 })
      });
    }

    return <Helmet {...props} />;
  }

  render() {
    const { browser } = this.props;

    const title = this.getTitle();

    return (
      <div>
        {this.renderSeo(title)}

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

export default connect(mapStateToProps)(asyncConnect(asyncPromises)(Blog));
