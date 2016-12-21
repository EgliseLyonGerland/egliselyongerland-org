import React, { Component, PropTypes } from 'react';

import classes from 'classnames';
import { Container, Text, Hr } from 'components';

import styles from './Jumbotron.scss';
import picture from './default.jpg';

class Jumbotron extends Component {
  static propTypes = {
    height: PropTypes.string,
    background: PropTypes.string,
    title: PropTypes.string,
    overlay: PropTypes.number,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.string,
    children: PropTypes.any,
  }

  static defaultProps = {
    overlay: 0,
    fontSize: 4,
    fontWeight: 'bold',
  }

  render() {
    const {
      title,
      height,
      background,
      overlay,
      fontSize,
      fontWeight,
      children,
    } = this.props;

    const className = classes(
      styles.jumbotron,
      { [styles.overlay]: (overlay > 0) }
    );

    return (
      <div className={className} style={{ backgroundImage: `url(${background || picture})` }}>
        <div className={styles.content} style={{ minHeight: height || '40vh' }}>
          {title &&
            <Container md className={styles.title}>
              <Text fontSize={fontSize} color="white" fontWeight={fontWeight}>{title}</Text>
              <Hr line />
            </Container>
          }

          {children}
        </div>
      </div>
    );
  }
}

export default Jumbotron;
