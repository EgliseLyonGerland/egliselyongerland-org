import React from 'react';
import PropTypes from 'prop-types';

import Share from './Share';

const TwitterShare = ({ children, url, text }) => (
  // https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}
  <Share
    height={300}
    title="Tweeter"
    url={`https://twitter.com/share?url=${url}&text=${encodeURIComponent(
      text,
    )}`}
    width={600}
  >
    {children}
  </Share>
);

TwitterShare.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

TwitterShare.defaultProps = {
  text: '',
};

export default TwitterShare;
