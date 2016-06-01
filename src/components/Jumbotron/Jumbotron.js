import React, {Component, PropTypes} from 'react';

export default
class Jumbotron extends Component {

  static propTypes = {
    title: PropTypes.string,
    baseline: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
  }

  render() {
    const styles = require('./Jumbotron.scss');
    const { title, baseline, img } = this.props;

    return (
      <div className={styles.jumbotron} style={{ backgroundImage: `url(${img})` }}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {baseline && (
            <div className={styles.baseline}>{baseline}</div>
          )}
        </div>
      </div>
    );
  }
}
