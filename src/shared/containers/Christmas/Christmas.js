import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { NavLink as Link } from 'react-router-dom';
import clx from 'classnames';
import { Parallax } from 'react-scroll-parallax';

import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import Hr from 'components/Hr/Hr';
import routes from 'utils/routes';

import noiseImage from './images/noise.png';
import titleImage from './images/title.svg';
import whenWhereImage from './images/when-where.svg';
import separatorImage from './images/separator.svg';
import backgroundImage from './images/background.png';

const styles = ({ breakpoints, typography }) => ({
  root: {
    minHeight: '100vh',
    background: '#202626',
    paddingBottom: 50,

    '& a': {
      color: '#E05D5D',
    },
  },
  backgroundWrapper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
  },
  background: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: 'calc(100vh + 80px)',

    backgroundImage: `url(${backgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'top center',
  },
  noise: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    backgroundImage: `url(${noiseImage})`,
    opacity: 0.03,
  },
  top: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    animationName: 'slide-y-from-0-to--10',
    animationDuration: '1ms',
    animationTimeline: 'scroll()',

    '& img': {
      width: '100%',
      minWidth: 500,
      maxWidth: 1000,
      opacity: 0.3,
    },
  },
  inner: {
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    maxHeight: 800,
    gap: '40px',
    padding: [[0, 16]],

    animationName: 'opacity-from-100-to-0',
    animationDuration: '1ms',
    animationTimeline: 'scroll()',
  },
  title: {},
  whenWhere: {},
  content: {
    margin: [[0, 16]],
  },
  body: {
    color: '#DCE1E1',
    fontSize: '1.5rem',
  },
  heading1: {
    color: '#ddca87',
  },
  heading2: {
    color: '#ddca87',
    fontWeight: typography.fontWeights.bold,
  },
  quoteWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 80,
  },
  quote: {
    color: '#ddca87',
    fontWeight: typography.fontWeights.regular,
    fontStyle: 'italic',
    fontSize: '42px',
    lineHeight: 1.5,
    textAlign: 'center',
    textWrap: 'balance',
    maxWidth: '500px',
  },
  quoteAuthor: {
    display: 'inline-block',
    fontSize: '0.8em',
  },
  facebookLink: {
    display: 'block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  separator: {
    textAlign: 'center',
  },

  [breakpoints.up('sm')]: {
    title: {
      height: '40vh',
      minHeight: 240,
      maxHeight: 320,
    },
    whenWhere: {
      height: '15vh',
      minHeight: 64,
      maxHeight: 80,
    },
  },
  [breakpoints.down('sm')]: {
    header: {
      height: '80vh',
      gap: '5vh',
    },
    title: {
      width: '80vw',
      height: 'auto',
      maxWidth: 500,
    },
    whenWhere: {
      width: '60vw',
      height: 'auto',
      maxWidth: 350,
    },
  },
  [breakpoints.down('xs')]: {
    content: {
      margin: [[40, 16]],
    },
  },
});

const title = 'Célébration de Noël';

const Christmas = ({ classes }) => (
  <div className={clx(classes.root, 'no-bottom-padding')}>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Parallax
      offsetYMax="80px"
      offsetYMin="-80px"
      className={classes.backgroundWrapper}
    >
      <div className={classes.background} />
    </Parallax>

    <div className={classes.inner}>
      <Parallax className={classes.inner} offsetYMax={20} offsetYMin={-20}>
        <div className={classes.header}>
          <img
            className={classes.title}
            src={titleImage}
            alt="Célébration Protestante de Noël"
          />
          <img
            className={classes.whenWhere}
            src={whenWhereImage}
            alt="14 décembre 2024 à 10h à la maison Ravier"
          />
        </div>
      </Parallax>

      <div className={classes.content}>
        <Container sm>
          <Typography variant="h5" className={classes.heading1}>
            La paroisse protestante de Lyon Gerland se réjouit de vous
            accueillir pour sa célébration de Noël.
          </Typography>
          <Hr multiplier={6} />
          <div className={classes.separator}>
            <img src={separatorImage} alt="" />
          </div>
          <Hr />
          <Typography component="div" paragraph className={classes.body}>
            Ouverte à tous, c'est l'occasion de (re)découvrir le message
            originel de Noël !<br />
            <br />
            Si ce n'est plus la fête païenne de la victoire du soleil sur la
            nuit (sol invictus), christianisée au début du 4ème siècle, Noël
            n'est pas non plus la fête du petit Jésus sous le sapin, au pied
            duquel le père Noël vient déposer des cadeaux par milliers !
            <br />
            <br />
            Non, le message du Noël chrétien est beaucoup plus profond,
            peut-être plus dérangeant aussi, mais certainement plus pertinent
            que jamais. Il s'agit d'un message de secours et de liberté, que
            nous vous proposons de découvrir lors de cette célébration de Noël
            du 14 décembre.
            <br />
            <br />
            <Typography variant="h5" className={classes.heading2}>
              Déroulement :
            </Typography>
            <ul style={{ paddingLeft: 16 }}>
              <li>9h30 : Accueil et café</li>
              <li style={{ marginTop: 12 }}>
                10h00 : Début de la célébration, avec des chants, la lecture de
                l'histoire de Noël, un message centré sur la signification de la
                naissance de Jésus...
              </li>
              <li style={{ marginTop: 12 }}>
                11h30 : Fin. Enfin, pas tout à fait, on aime bien rester
                discuter un peu{' '}!
              </li>
            </ul>
            <br />
            <Typography variant="h5" className={classes.heading2}>
              Lieu :
            </Typography>
            <div style={{ marginTop: '1em' }}>
              Maison Ravier
              <br />
              5-7 rue Ravier - Lyon 7e
              <br />
              <a
                href="https://maps.app.goo.gl/hoTxWds7m6reWHE1A"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir sur Google Maps
              </a>
            </div>
            <br />
            Visitez la page Facebook de l'évènement :{' '}
            <a
              href="https://fb.me/e/3LiOwVVc8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={classes.facebookLink}>
                https://fb.me/e/3LiOwVVc8
              </span>
            </a>
            <br />
            <div className={classes.separator}>
              <img src={separatorImage} alt="" />
            </div>
            <br />
            <br />
            Si vous n'êtes pas familier du culte protestant, ou si vous êtes
            simplement curieux de son déroulement et de sa signification,
            n'hésitez pas à consulter la page{' '}
            <Link to={routes.worship()}>Le culte</Link>.
            <br />
            <br />
            En cas de besoin, n’hésitez pas à{' '}
            <Link to="/contact">nous contacter</Link> !
          </Typography>
          <div className={classes.quoteWrapper}>
            <Typography className={classes.quote}>
              <Hr xl />« Gloire à Dieu et paix sur la terre. »{' '}
              <span className={clx(classes.body, classes.quoteAuthor)}>
                — La Bible
              </span>
            </Typography>
          </div>
        </Container>
      </div>
    </div>
  </div>
);

Christmas.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Christmas);
