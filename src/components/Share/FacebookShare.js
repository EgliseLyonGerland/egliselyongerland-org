import React from "react";

import Share from "./Share";

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

export default FacebookShare;
