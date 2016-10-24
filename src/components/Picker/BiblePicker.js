import React, { Component, PropTypes } from 'react';

import { get, find, findIndex } from 'lodash';

import { Motion, spring } from 'react-motion';
import { TabPicker, GridPicker, LabelPicker, Text } from 'components';

import styles from './BiblePicker.scss';

const mainTabs = [{
  key: 'books',
  label: 'Livres',
}, {
  key: 'chapters',
  label: 'Chapitres',
}, {
  key: 'verses',
  label: 'Versets',
}];

const booksTabs = [{
  key: 'old',
  label: 'Ancien testament',
}, {
  key: 'new',
  label: 'Nouveau testament',
}];

export default
class BiblePicker extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      testament: PropTypes.string.isRequired,
      chapters: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        verses: PropTypes.arrayOf(PropTypes.number).isRequired,
      })).isRequired,
    })).isRequired,
    currentTestament: PropTypes.oneOf(['new', 'old']),
    currentBook: PropTypes.number,
    currentChapter: PropTypes.number,
    currentVerse: PropTypes.number,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    currentTestament: 'old',
  }

  constructor(props) {
    super();

    this.state = {
      currentTestament: props.currentTestament,
      currentPane: this.getCurrentPane(props),
    };

    this.mainTabs = [...mainTabs];
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPane: this.getCurrentPane(nextProps) });
  }

  getCurrentBook() {
    const { books, currentBook } = this.props;

    if (currentBook) {
      return find(books, ['id', currentBook]);
    }

    return null;
  }

  getCurrentChapter() {
    const { currentChapter } = this.props;

    if (currentChapter) {
      const chapters = get(this.getCurrentBook(), 'chapters', []);

      return find(chapters, ['number', currentChapter]);
    }

    return null;
  }

  getCurrentPane(props) {
    let pane = 'books';

    if (props.currentBook) {
      pane = 'chapters';
    }

    if (props.currentChapter) {
      pane = 'verses';
    }

    return pane;
  }

  getPaneName(pane) {
    const {
      currentChapter,
      currentVerse,
    } = this.props;

    if (pane === 'books') {
      const book = this.getCurrentBook();

      return book ? book.name : 'Livres';
    }

    if (pane === 'chapters') {
      return currentChapter ? `Chapitre ${currentChapter}` : 'Chapitres';
    }

    return currentVerse ? `Verset ${currentVerse}` : 'Versets';
  }

  getTabs() {
    const { currentPane } = this.state;

    return mainTabs.map(tab => ({
      ...tab,
      label: this.getPaneName(tab.key),
      active: true,
      current: tab.key === currentPane,
    }));
  }

  toggleTestament() {
    this.setState({
      currentTestament: (this.state.currentTestament === 'old' ? 'new' : 'old'),
    });
  }

  renderBooksPane() {
    const { currentTestament } = this.state;
    const { books, currentBook, onChange = () => {} } = this.props;

    const currentPaneIndex = findIndex(booksTabs, ['key', currentTestament]);

    const panes = booksTabs.map(tab =>
      <div key={tab.key} className={styles.pane}>
        <LabelPicker
          current={currentBook}
          labels={books
            .filter(book => book.testament === tab.key)
            .map(({ id, name }) => ({ key: id, label: name }))}
          onChange={key => onChange({ book: key, chapter: null, verse: null })}
        />
      </div>
    );

    return (
      <div>
        <TabPicker
          tabs={booksTabs.map(tab => ({ ...tab, current: tab.key === currentTestament }))}
          bgColor="#F7F7F7"
          activeBarColor="#CCC"
          renderLabel={tab =>
            <Text fontSize={0.8} color="#777" ellipsis maxLines={1}>{tab.label}</Text>
          }
          onChange={() => this.toggleTestament()}
        />

        <div className={styles.panes}>
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(currentPaneIndex * 100) }}
          >
            {style =>
              <div style={{ transform: `translateX(${-style.x}%)` }}>
                {panes}
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  }

  renderChaptersPane() {
    const {
      currentBook,
      currentChapter,
      onChange = () => {}
    } = this.props;

    const chapters = get(this.getCurrentBook(), 'chapters', []);

    return (
      <GridPicker
        current={currentChapter}
        items={chapters.map(chapter =>
          ({ key: chapter.number, label: `${chapter.number}` })
        )}
        onChange={chapter => onChange({ book: currentBook, chapter, verse: null })}
      />
    );
  }

  renderVersesPane() {
    const {
      currentBook,
      currentChapter,
      currentVerse,
      onChange = () => {}
    } = this.props;

    const verses = get(this.getCurrentChapter(), 'verses', []);

    return (
      <GridPicker
        current={currentVerse}
        items={verses.map(verse =>
          ({ key: verse, label: `${verse}` })
        )}
        onChange={verse => onChange({ book: currentBook, chapter: currentChapter, verse })}
      />
    );
  }

  renderPane(key) {
    switch (key) {
      case 'chapters':
        return this.renderChaptersPane();

      case 'verses':
        return this.renderVersesPane();

      default:
        return this.renderBooksPane();
    }
  }

  render() {
    const tabs = this.getTabs();
    const currentTabIndex = findIndex(tabs, ['current', true]);

    return (
      <div>
        <TabPicker
          tabs={tabs}
          onChange={tab => this.setState({ currentPane: tab.key })}
        />

        <div className={styles.panes}>
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(currentTabIndex * 100) }}
          >
            {style =>
              <div style={{ transform: `translateX(${-style.x}%)` }}>
                {tabs.map(tab =>
                  <div key={tab.key} className={styles.pane}>
                    {this.renderPane(tab.key)}
                  </div>
                )}
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  }
}
