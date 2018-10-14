import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import find from 'lodash/find';
import findIndex from 'lodash/findIndex';
import noop from 'lodash/noop';

import PanePicker from 'components/Picker/PanePicker';
import GridPicker from 'components/Picker/GridPicker';
import LabelPicker from 'components/Picker/LabelPicker';

const mainTabs = [
  {
    key: 'books',
    label: 'Livres',
  },
  {
    key: 'chapters',
    label: 'Chapitres',
  },
  {
    key: 'verses',
    label: 'Versets',
  },
];

const booksTabs = [
  {
    key: 'old',
    label: 'Ancien testament',
  },
  {
    key: 'new',
    label: 'Nouveau testament',
  },
];

class BiblePicker extends Component {
  constructor(props) {
    super(props);

    const { books, currentBook } = props;

    this.state = {
      currentTestament: get(
        find(books, ['id', currentBook]),
        'testament',
        'old',
      ),
      currentMainPane: this.getCurrentPane(),
    };
  }

  componentDidMount() {
    this.setState({ currentMainPane: this.getCurrentPane() });
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

  getCurrentPane() {
    const book = this.getCurrentBook();
    const chapter = this.getCurrentChapter();

    if (chapter && chapter.verses.length) {
      return 'verses';
    }

    if (book && book.chapters.length) {
      return 'chapters';
    }

    return 'books';
  }

  getPaneName(pane) {
    const { currentChapter, currentVerse } = this.props;

    if (pane === 'books') {
      const book = this.getCurrentBook();

      return book ? book.name : 'Livres';
    }

    if (pane === 'chapters') {
      return currentChapter ? `Chapitre ${currentChapter}` : 'Chapitres';
    }

    return currentVerse ? `Verset ${currentVerse}` : 'Versets';
  }

  getMainPanes() {
    return mainTabs.map(tab => {
      const children = this.renderMainPane(tab.key);

      return {
        ...tab,
        label: this.getPaneName(tab.key),
        active: children !== null,
        children,
      };
    });
  }

  renderBooksPane(testament) {
    const {
      books,
      currentBook,
      readOnly = false,
      onChange = () => {},
    } = this.props;

    return (
      <LabelPicker
        current={currentBook}
        labels={books
          .filter(book => book.testament === testament)
          .map(({ id, name }) => ({ key: id, label: name }))}
        readOnly={readOnly}
        onChange={key =>
          onChange({ book: key, chapter: undefined, verse: undefined })
        }
      />
    );
  }

  renderBooksPanes() {
    const { books } = this.props;
    const { currentTestament } = this.state;

    return (
      <PanePicker
        current={currentTestament}
        height={400}
        panes={booksTabs.map(tab => ({
          ...tab,
          children: this.renderBooksPane(tab.key),
          active: findIndex(books, ['testament', tab.key]) > -1,
        }))}
        tabActiveBarColor="#CCC"
        tabBgColor="#F7F7F7"
        onChange={pane =>
          this.setState({
            currentTestament: pane.key,
          })
        }
      />
    );
  }

  renderChaptersPane() {
    const {
      currentBook,
      currentChapter,
      readOnly = false,
      onChange = () => {},
    } = this.props;

    const chapters = get(this.getCurrentBook(), 'chapters', []);

    if (!chapters.length) {
      return null;
    }

    return (
      <GridPicker
        current={currentChapter}
        items={chapters.map(chapter => ({
          key: chapter.number,
          label: `${chapter.number}`,
        }))}
        readOnly={readOnly}
        onChange={chapter =>
          onChange({ book: currentBook, chapter, verse: undefined })
        }
      />
    );
  }

  renderVersesPane() {
    const {
      currentBook,
      currentChapter,
      currentVerse,
      readOnly = false,
      onChange = () => {},
    } = this.props;

    const verses = get(this.getCurrentChapter(), 'verses', []);

    if (!verses.length) {
      return null;
    }

    return (
      <GridPicker
        current={currentVerse}
        items={verses.map(verse => ({ key: verse, label: `${verse}` }))}
        readOnly={readOnly}
        onChange={verse =>
          onChange({ book: currentBook, chapter: currentChapter, verse })
        }
      />
    );
  }

  renderMainPane(key) {
    switch (key) {
      case 'chapters':
        return this.renderChaptersPane();

      case 'verses':
        return this.renderVersesPane();

      default:
        return this.renderBooksPanes();
    }
  }

  render() {
    const { currentMainPane } = this.state;
    const panes = this.getMainPanes();

    return (
      <PanePicker
        current={currentMainPane}
        panes={panes}
        onChange={pane =>
          this.setState({
            currentMainPane: pane.key,
          })
        }
      />
    );
  }
}

BiblePicker.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      chapters: PropTypes.arrayOf(
        PropTypes.shape({
          number: PropTypes.number.isRequired,
          verses: PropTypes.arrayOf(PropTypes.number).isRequired,
        }),
      ).isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      testament: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentBook: PropTypes.number,
  currentChapter: PropTypes.number,
  currentVerse: PropTypes.number,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

BiblePicker.defaultProps = {
  currentBook: null,
  currentChapter: null,
  currentVerse: null,
  onChange: noop,
  readOnly: false,
};

BiblePicker.defaultProps = {};

export default BiblePicker;
