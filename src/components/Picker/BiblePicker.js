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
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      chapters: PropTypes.arrayOf(PropTypes.shape({
        number: PropTypes.number.isRequired,
        verses: PropTypes.arrayOf(PropTypes.shape({
          number: PropTypes.number.isRequired,
        })).isRequired,
      })).isRequired,
    })).isRequired,
    currentTestament: PropTypes.oneOf(['new', 'old']),
    currentBook: PropTypes.string,
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
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ currentPane: this.getCurrentPane(nextProps) });
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

  getTabs() {
    const { currentPane } = this.state;

    return mainTabs.map(tab => ({
      ...tab,
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
      <div key={tab.key} className={styles.pane} style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <LabelPicker
          current={currentBook}
          labels={books
            .filter(book => book.testament === tab.key)
            .map(({ key, label }) => ({ key, label }))}
          onChange={label => onChange({ book: label.key, chapter: null, verse: null })}
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
      currentBook, currentChapter,
      books, onChange = () => {}
    } = this.props;

    const chapters = get(find(books, ['key', currentBook]), 'chapters', []);

    return (
      <GridPicker
        items={chapters.map(chapter =>
          ({ key: `${chapter.number}`, label: `${chapter.number}`, current: currentChapter })
        )}
        onChange={chapter => onChange({ book: currentBook, chapter, verse: null })}
      />
    );
  }

  renderVersesPane() {
    const {
      currentBook, currentChapter, currentVerse,
      books, onChange = () => {}
    } = this.props;

    const chapters = get(find(books, ['key', currentBook]), 'chapters', []);
    const verses = get(find(chapters, ['number', currentChapter]), 'verses', []);

    return (
      <GridPicker
        items={verses.map(verse =>
          ({ key: `${verse.number}`, label: `${verse.number}`, current: currentVerse })
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
