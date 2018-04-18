import React from "react";

import Share from "./Share";

const TwitterShare = ({ children, url, text = "" }) => (
  // https://twitter.com/share?url={url}&text={text}&via={via}&hashtags={hashtags}
  <Share
    url={`https://twitter.com/share?url=${url}&text=${encodeURIComponent(
      text
    )}`}
    title="Tweeter"
    width={600}
    height={300}
  >
    {children}
  </Share>
);

export default TwitterShare;
