import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import rem from 'polished/lib/helpers/rem';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import Typography from 'components/Typography/Typography';
import Button from 'components/Button/Button';
import Image from 'components/Image/Image';
import RevealQueue from 'components/Animation/RevealQueue';
import routes from 'utils/routes';

import jumbotronImage from './images/jumbotron.jpg';
import bibleImage from './images/bible.jpg';

const styles = ({ palette, typography, breakpoints }) => ({
  inner: {
    margin: [[88, 0]],
  },
  title: {
    display: 'block',
    fontSize: rem(32),
    fontWeight: typography.fontWeights.regular,
    color: palette.primary[500],
    textAlign: 'center',
    marginBottom: 40,

    '&::after': {
      content: '""',
      display: 'block',
      width: 140,
      height: 1,
      backgroundColor: palette.primary[500],
      margin: [[32, 'auto', 0]],
    },
  },
  imageWrapper: {
    margin: [[64, 0, -80]],
  },
  discoverWrapper: {
    position: 'relative',
  },
  discoverInner: {
    backgroundColor: 'white',
  },
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: [[64, 0]],
  },
  [breakpoints.down('xs')]: {
    inner: {
      margin: [[40, 0]],
    },
    title: {
      fontSize: rem(24),

      '&::after': {
        width: 90,
        marginTop: 24,
      },
    },
  },
});

const title = 'Un message incontournable';

const Discover = ({ classes }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Jumbotron background={jumbotronImage} title={title} />

    <div className={classes.inner}>
      <RevealQueue delay={0.5} offset={100}>
        <Container sm>
          <h2 className={classes.title}>
            La Bible est un livre <em>extraordinaire</em>
          </h2>
          <Typography variant="body1" paragraph>
            Que l’on soit croyant ou non, le moins qu’on puisse dire, c’est que
            la Bible est un livre complètement à part dans toute l’histoire de
            la littérature ! Un livre unique du point de vue de sa composition,
            de sa distribution, de sa conservation, de son influence…
          </Typography>
          <Typography variant="body1" paragraph>
            Mais si la Bible est un livre extraordinaire, c’est surtout parce
            qu’elle contient un message extraordinaire. Un message
            incontournable, même !
          </Typography>
        </Container>
        <Container className={classes.imageWrapper} noMargins>
          <Image ratio="16/9" src={bibleImage} />
        </Container>
        <Container
          classes={{ inner: classes.discoverInner }}
          className={classes.discoverWrapper}
          sm
          withPaddings
        >
          <h2 className={classes.title}>
            Découvrir <em>la Bible</em>
          </h2>
          <Typography variant="body1">
            À l’Église Lyon Gerland, nous vous proposons de suivre un
            parcours-découverte qui vous permettra de vous familiariser avec ce
            « livre à part ».
          </Typography>
          <Typography variant="body1">
            Intéressé(e) ? Faites-le nous savoir !
          </Typography>
          <div className={classes.buttonWrapper}>
            <Link to={routes.contact()}>
              <Button>Contact</Button>
            </Link>
          </div>
          <Typography variant="body1">
            Au plaisir de découvrir la Bible ensemble,
            <br />
            <br />
            <b>Alexandre</b>
            <br />
            <em>Pasteur</em>
          </Typography>
        </Container>
      </RevealQueue>
    </div>
  </div>
);

Discover.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Discover);
