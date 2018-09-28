import React from 'react';
import PropTypes from 'prop-types';

import Share from './Share';

const FacebookShare = ({ children, url }) => (
  <Share
    url={`https://facebook.com/sharer/sharer.php?u=${url}`}
    title="Partager"
    width={600}
    height={600}
  >
    {children}
  </Share>
);

FacebookShare.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

export default FacebookShare;
