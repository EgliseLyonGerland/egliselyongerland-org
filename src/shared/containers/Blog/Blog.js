import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
import map from 'lodash/map';
import { TransitionMotion, spring } from 'react-motion';
import { denormalize } from 'normalizr';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import routes from 'utils/routes';
import { postSchema } from 'store/schemas';

import Helmet from 'react-helmet';

import Jumbotron from 'components/Jumbotron/Jumbotron';
import PickerPanel from 'components/Picker/PickerPanel';
import BiblePicker from 'components/Picker/BiblePicker';
import LabelPicker from 'components/Picker/LabelPicker';
import PopButton from 'components/PopButton/PopButton';
import PostsFeed from 'components/PostsFeed/PostsFeed';
import BlankItemsFeed from 'components/PostsFeed/BlankItemsFeed';
import Container from 'components/Container/Container';
import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';

import jumbotron from './jumbotron.jpg';

// const renderSearchFilter = () => (
//   <div>
//     <input
//       className="form-control"
//       type="text"
//       placeholder="Saisissez votre recherche"
//     />
//   </div>
// );

@withWidth()
class Blog extends Component {
  static propTypes = {
    aggs: PropTypes.shape().isRequired,
    loading: PropTypes.bool.isRequired,
    location: PropTypes.shape().isRequired,
    maxPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    params: PropTypes.shape().isRequired,
    posts: PropTypes.arrayOf(PropTypes.string).isRequired,
    total: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
  };

  static contextTypes = {
    router: PropTypes.shape(),
  };

  getDenormalizedPosts() {
    const { posts, entities } = this.props;

    return denormalize(posts, [postSchema], entities);
  }

  getTitle() {
    const {
      params: { category = null },
      aggs: { categories = null },
    } = this.props;

    return reduce(
      categories,
      (prev, curr) => {
        if (curr.id === parseInt(category, 10)) {
          return curr.name;
        }

        return prev;
      },
      'Blog',
    );
  }

  renderBibleFilter() {
    const {
      loading,
      params,
      aggs: { bibleRefs = null },
      history,
    } = this.props;

    if (!bibleRefs || !bibleRefs.length) {
      return null;
    }

    return (
      <PickerPanel title="Référence biblique">
        <BiblePicker
          books={bibleRefs}
          currentBook={parseInt(params.book, 10)}
          currentChapter={parseInt(params.chapter, 10)}
          currentVerse={parseInt(params.verse, 10)}
          readOnly={loading}
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
      history,
    } = this.props;

    if (categories === null) {
      return null;
    }

    const readOnly = loading || (categories.length === 1 && !params.category);

    return (
      <PickerPanel title="Catégorie">
        <LabelPicker
          crop={10}
          current={parseInt(params.category, 10)}
          labels={categories.map(category => ({
            key: category.id,
            label: category.name,
            total: category.total,
          }))}
          readOnly={readOnly}
          onChange={key =>
            history.push(
              routes.blog({ ...params, page: undefined, category: key }),
            )
          }
        >
          {label => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label}{' '}
              <Text color="#AAA" element="span" fontSize={0.8}>
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
      history,
    } = this.props;

    if (authors === null) {
      return null;
    }

    const readOnly = loading || (authors.length === 1 && !params.author);

    return (
      <PickerPanel title="Auteur">
        <LabelPicker
          crop={10}
          current={parseInt(params.author, 10)}
          labels={authors.map(author => ({
            key: author.id,
            label: author.name,
            total: author.total,
          }))}
          readOnly={readOnly}
          onChange={key =>
            history.push(
              routes.blog({ ...params, page: undefined, author: key }),
            )
          }
        >
          {label => (
            <Text fontSize={1} maxLines={1} ellipsis>
              {label.label}{' '}
              <Text color="#AAA" element="span" fontSize={0.8}>
                ({label.total})
              </Text>
            </Text>
          )}
        </LabelPicker>
      </PickerPanel>
    );
  }

  renderFilters() {
    const { aggs } = this.props;

    if (aggs === null) {
      return <Text>Chargement...</Text>;
    }

    const filters = {
      // renderSearchFilter(),
      categories: this.renderCategoriesFilter(),
      authors: this.renderAuthorsFilter(),
      bible: this.renderBibleFilter(),
    };

    return (
      <div>
        {map(filters, (filter, name) =>
          filter ? (
            <div key={name}>
              {filter}
              <Hr lg />
            </div>
          ) : null,
        )}
      </div>
    );
  }

  renderPosts() {
    const { loading } = this.props;

    const posts = this.getDenormalizedPosts();

    if (loading) {
      return <BlankItemsFeed color="#4776e6" items={7} />;
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
        <Grid alignItems="center" justify="space-between" container>
          <Grid item>
            {total} {total > 1 ? 'articles' : 'article'}
            <Hr inline />
            page {page}/{maxPage}
          </Grid>
          <Grid item>
            <Button
              disabled={page <= 1}
              mode="ghost"
              type="icon"
              onClick={() =>
                history.push(routes.blog({ ...params, page: page - 1 }))
              }
            >
              <ChevronLeftIcon />
            </Button>
            <Hr multiplier={1} inline />
            <Button
              disabled={page >= maxPage}
              mode="ghost"
              type="icon"
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
      location: { pathname, search },
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
                style: { x: spring(0) },
              },
            ]}
            willEnter={() => ({ x: 110 })}
            willLeave={() => ({ x: spring(-110) })}
          >
            {interpolatedStyles => (
              <div
                style={{
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflowX: 'hidden',
                }}
              >
                {interpolatedStyles.map(({ key, style, data }, index) => (
                  <div
                    key={key}
                    style={{
                      width: '100%',
                      whiteSpace: 'normal',
                      display: 'inline-block',
                      verticalAlign: 'top',
                      transform: `translateX(${style.x - index * 100}%)`,
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
      meta: [],
    };

    if (page > 1) {
      props.link.push({
        rel: 'prev',
        href: routes.blog({ ...params, page: page - 1 }),
      });

      props.meta.push({ name: 'robots', content: 'noindex' });
    }

    if (page < maxPage) {
      props.link.push({
        rel: 'next',
        href: routes.blog({ ...params, page: page + 1 }),
      });
    }

    return <Helmet {...props} />;
  }

  render() {
    const { width } = this.props;

    const title = this.getTitle();

    return (
      <div>
        {this.renderSeo(title)}

        <Jumbotron background={jumbotron} title={title} />
        <Hr xl />
        <Container md>
          {isWidthUp('sm', width)
            ? this.renderWideScreen()
            : this.renderSmallScreen()}
        </Container>
      </div>
    );
  }
}

export default Blog;
