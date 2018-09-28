import React from 'react';
import PropTypes from 'prop-types';

const PlaceHolder = ({ children, width }) => (
  <div style={{ width }}>{children}</div>
);

PlaceHolder.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default PlaceHolder;
