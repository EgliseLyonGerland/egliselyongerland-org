/* eslint-disable no-restricted-globals */

import React from "react";

const Share = ({ children, url, title, width, height }) => {
  return React.cloneElement(React.Children.only(children), {
    onClick: () => {
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left;

      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top;

      const screenWidth = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
          ? document.documentElement.clientWidth
          : screen.width;

      const screenHeight = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
          ? document.documentElement.clientHeight
          : screen.height;

      const left = screenWidth / 2 - width / 2 + dualScreenLeft;
      const top = screenHeight / 2 - height / 2 + dualScreenTop;

      const newWindow = window.open(
        url,
        title,
        `width=${width}, height=${height}, top=${top}, left=${left}, location=0, menubar=0, resizeable=0, scrollbars=0, status=0, titlebar=0, toolbar=0`
      );

      if (window.focus) {
        newWindow.focus();
      }
    }
  });
};

export default Share;
