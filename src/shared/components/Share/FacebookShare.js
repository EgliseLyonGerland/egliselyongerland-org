import React from 'react';
import PropTypes from 'prop-types';

import Share from './Share';

const FacebookShare = ({ children, url }) => (
  <Share
    height={600}
    title="Partager"
    url={`https://facebook.com/sharer/sharer.php?u=${url}`}
    width={600}
  >
    {children}
  </Share>
);

FacebookShare.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
};

export default FacebookShare;
