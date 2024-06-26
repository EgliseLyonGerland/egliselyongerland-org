import { rgba } from 'polished';
import primary from './palettes/primary.json';
import secondary from './palettes/secondary.json';

const headerHeight = 100;

export default {
  breakpoints: {
    keys: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    values: {
      xxs: 0,
      xs: 480,
      sm: 720,
      md: 1024,
      lg: 1280,
      xl: 1440,
      xxl: 1920,
    },
  },
  props: {
    MuiWithWidth: {
      initialWidth: 'lg',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: `'Source Sans Pro', sans-serif`,
    fontSize: 16,
    fontWeight: 400,
    fontWeights: {
      thin: 300,
      light: 300,
      regular: 400,
      medium: 600,
      bold: 700,
      black: 700,
    },
  },
  palette: {
    primary,
    secondary,
    text: {
      primary: '#444',
      secondary: '#777',
      disabled: '#aaa',
      hint: '#aaa',
    },
    background: '#fafafa',
  },
  header: {
    height: headerHeight,
    zindex: 100,
    logo: { height: 58 },
    brand: { height: 56 },
    mini: {
      height: headerHeight * 0.8,
    },
    sticky: {
      height: headerHeight * 0.6,
      brandScale: 0.76,
      brandTranslate: -10,
    },
  },
  footer: {
    height: 70,
  },
  overlay: {
    zindex: 100,
  },
  sidebar: {
    zindex: 200,
  },
  hr: {
    sizes: {
      nm: 0,
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 40,
    },
  },
  popButton: {
    zindex: 1200,
    size: 60,
    margin: 15,
  },
  postFeed: {
    margin: 36,
    pictureWidth: 170,
    pictureHeight: 130,
  },
  picker: {
    borderColor: '#ededed',
  },
  gradient: () => ({
    // background: '#4776e6',
    // background: '-webkit-linear-gradient(to right, #4776e6, #8e54e9)',
    background: 'linear-gradient(to right, #4776e6, #8e54e9)',
  }),
  borderGradient: () => ({
    border: '#4776e6 solid 1px',
    borderImage: 'linear-gradient(to right, #4776e6, #8e54e9) 1',
  }),
  jumbotronGradient: {
    backgroundImage: `linear-gradient(-225deg, ${rgba(
      '#302D7D',
      0.9,
    )} 0%, ${rgba('#302D7D', 0.1)} 100%)`,
  },
  mixins: {
    withHover:
      '@media (any-hover: hover), (-moz-touch-enabled: 0), (-ms-high-contrast: none)',
  },
};
