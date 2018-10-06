import config from 'config';

const {
  app: { breakpointNames, breakpointRanges },
} = config;

const atRule = (rule, styles) => ({
  [rule]: styles,
});

const createFunctions = breakpointName => {
  const gt = styles => {
    const min = breakpointRanges[breakpointName][1] + 1;

    if (breakpointName === 'wide') {
      return {};
    }

    return atRule(`@media (min-width: ${min}px)`, styles);
  };

  const gte = styles => {
    const min = breakpointRanges[breakpointName][0];

    return atRule(`@media (min-width: ${min}px)`, styles);
  };

  const lt = styles => {
    const max = breakpointRanges[breakpointName][0] - 1;

    if (breakpointName === 'xsmall') {
      return {};
    }

    return atRule(`@media (max-width: ${max}px)`, styles);
  };

  const lte = styles => {
    const max = breakpointRanges[breakpointName][1];

    return atRule(`@media (max-width: ${max}px)`, styles);
  };

  const eq = styles => {
    const min = breakpointRanges[breakpointName][0];
    const max = breakpointRanges[breakpointName][1];

    if (breakpointName === 'wide') {
      return gte('wide', styles);
    }

    return atRule(
      `@media (min-width: ${min}px) and (max-width: ${max}px)`,
      styles,
    );
  };

  return { eq, gt, gte, lt, lte };
};

const mq = breakpointNames.reduce((acc, breakpointName) => {
  acc[breakpointName] = createFunctions(breakpointName);

  return acc;
}, {});

export default mq;
