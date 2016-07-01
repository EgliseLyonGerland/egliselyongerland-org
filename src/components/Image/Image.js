import React, {Component, PropTypes} from 'react';

// import classnames from 'classnames';

export default
class Image extends Component {

  static propTypes = {
    src: PropTypes.string.isRequired,
    seoFriendly: PropTypes.bool,
  }

  static defaultProps = {
    seoFriendly: true,
  }

  render() {
    const styles = require('./Image.scss');

    const { src, seoFriendly } = this.props;

    return (
      <div className={styles.image} style={{ backgroundImage: `url(${src})` }}>
        {seoFriendly && (<img className={styles.img} src={src} />)}
      </div>
    );
  }
}
