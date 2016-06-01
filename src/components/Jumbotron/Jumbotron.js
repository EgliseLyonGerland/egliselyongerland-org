import React, {Component, PropTypes} from 'react';

import {Button, Hr} from 'components';

export default
class Jumbotron extends Component {

  static propTypes = {
    title: PropTypes.string,
    baseline: PropTypes.string,
    img: PropTypes.string,
    link: PropTypes.string,
    linkLabel: PropTypes.string,
  }

  static defaultProps = {
    linkLabel: 'Voir',
  }

  render() {
    const styles = require('./Jumbotron.scss');
    const { title, baseline, img, link, linkLabel } = this.props;

    return (
      <div className={styles.jumbotron} style={{ backgroundImage: `url(${img})` }}>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>

          {baseline && (
            <div className={styles.baseline}>{baseline}</div>
          )}

          {link && (
            <div className={styles.link}>
              <Button size="lg">
                {linkLabel}
                <Hr inline />
                <span className="fa fa-chevron-right" />
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
