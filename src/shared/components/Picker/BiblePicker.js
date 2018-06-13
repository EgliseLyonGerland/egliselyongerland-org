import React, { Component } from "react";
import PropTypes from "prop-types";

import { get, find, findIndex } from "lodash";

import { PanePicker, GridPicker, LabelPicker } from "components";

const mainTabs = [
  {
    key: "books",
    label: "Livres"
  },
  {
    key: "chapters",
    label: "Chapitres"
  },
  {
    key: "verses",
    label: "Versets"
  }
];

const booksTabs = [
  {
    key: "old",
    label: "Ancien testament"
  },
  {
    key: "new",
    label: "Nouveau testament"
  }
];

export default class BiblePicker extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        testament: PropTypes.string.isRequired,
        chapters: PropTypes.arrayOf(
          PropTypes.shape({
            number: PropTypes.number.isRequired,
            verses: PropTypes.arrayOf(PropTypes.number).isRequired
          })
        ).isRequired
      })
    ).isRequired,
    currentTestament: PropTypes.oneOf(["new", "old"]),
    currentBook: PropTypes.number,
    currentChapter: PropTypes.number,
    currentVerse: PropTypes.number,
    onChange: PropTypes.func,
    readOnly: PropTypes.bool
  };

  static defaultProps = {
    currentTestament: "old"
  };

  constructor(props) {
    super(props);

    const { books, currentBook } = props;

    this.state = {
      currentTestament: get(
        find(books, ["id", currentBook]),
        "testament",
        "old"
      ),
      currentMainPane: this.getCurrentPane()
    };
  }

  componentDidMount() {
    this.setState({ currentMainPane: this.getCurrentPane() });
  }

  getCurrentBook() {
    const { books, currentBook } = this.props;

    if (currentBook) {
      return find(books, ["id", currentBook]);
    }

    return null;
  }

  getCurrentChapter() {
    const { currentChapter } = this.props;

    if (currentChapter) {
      const chapters = get(this.getCurrentBook(), "chapters", []);

      return find(chapters, ["number", currentChapter]);
    }

    return null;
  }

  getCurrentPane() {
    const book = this.getCurrentBook();
    const chapter = this.getCurrentChapter();

    if (chapter && chapter.verses.length) {
      return "verses";
    }

    if (book && book.chapters.length) {
      return "chapters";
    }

    return "books";
  }

  getPaneName(pane) {
    const { currentChapter, currentVerse } = this.props;

    if (pane === "books") {
      const book = this.getCurrentBook();

      return book ? book.name : "Livres";
    }

    if (pane === "chapters") {
      return currentChapter ? `Chapitre ${currentChapter}` : "Chapitres";
    }

    return currentVerse ? `Verset ${currentVerse}` : "Versets";
  }

  getMainPanes() {
    return mainTabs.map(tab => {
      const children = this.renderMainPane(tab.key);

      return {
        ...tab,
        label: this.getPaneName(tab.key),
        active: children !== null,
        children
      };
    });
  }

  renderBooksPane(testament) {
    const {
      books,
      currentBook,
      readOnly = false,
      onChange = () => {}
    } = this.props;

    return (
      <LabelPicker
        current={currentBook}
        readOnly={readOnly}
        labels={books
          .filter(book => book.testament === testament)
          .map(({ id, name }) => ({ key: id, label: name }))}
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
        panes={booksTabs.map(tab => ({
          ...tab,
          children: this.renderBooksPane(tab.key),
          active: findIndex(books, ["testament", tab.key]) > -1
        }))}
        current={currentTestament}
        height={400}
        tabBgColor="#F7F7F7"
        tabActiveBarColor="#CCC"
        onChange={pane =>
          this.setState({
            currentTestament: pane.key
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
      onChange = () => {}
    } = this.props;

    const chapters = get(this.getCurrentBook(), "chapters", []);

    if (!chapters.length) {
      return null;
    }

    return (
      <GridPicker
        current={currentChapter}
        readOnly={readOnly}
        items={chapters.map(chapter => ({
          key: chapter.number,
          label: `${chapter.number}`
        }))}
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
      onChange = () => {}
    } = this.props;

    const verses = get(this.getCurrentChapter(), "verses", []);

    if (!verses.length) {
      return null;
    }

    return (
      <GridPicker
        current={currentVerse}
        readOnly={readOnly}
        items={verses.map(verse => ({ key: verse, label: `${verse}` }))}
        onChange={verse =>
          onChange({ book: currentBook, chapter: currentChapter, verse })
        }
      />
    );
  }

  renderMainPane(key) {
    switch (key) {
      case "chapters":
        return this.renderChaptersPane();

      case "verses":
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
        panes={panes}
        current={currentMainPane}
        onChange={pane =>
          this.setState({
            currentMainPane: pane.key
          })
        }
      />
    );
  }
}
