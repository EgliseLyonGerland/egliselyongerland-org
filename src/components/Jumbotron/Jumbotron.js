import React, { PropTypes } from 'react';

import { Button, Hr } from 'components';

import styles from './Jumbotron.scss';

const Jumbotron = ({ title, baseline, img, link, linkLabel }) => (
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

Jumbotron.propTypes = {
  title: PropTypes.string,
  baseline: PropTypes.string,
  img: PropTypes.string,
  link: PropTypes.string,
  linkLabel: PropTypes.string,
};

Jumbotron.defaultProps = {
  linkLabel: 'Voir',
};

export default Jumbotron;
