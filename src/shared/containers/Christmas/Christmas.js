import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { NavLink as Link } from 'react-router-dom';

import Jumbotron from 'components/Jumbotron/Jumbotron';
import Container from 'components/Container/Container';
import RevealQueue from 'components/Animation/RevealQueue';
import Typography from 'components/Typography/Typography';
import Hr from 'components/Hr/Hr';
import routes from 'utils/routes';

import jumbotronImage from './images/jumbotron.jpg';

const styles = ({ palette, typography, breakpoints }) => ({
  inner: {
    margin: [[88, 0]],
  },
  quote: {
    fontWeight: typography.fontWeights.regular,
    fontStyle: 'italic',
    color: palette.text.primary,
    fontSize: 24,
    lineHeight: 1.3,
    textAlign: 'center',
  },
  quoteAuthor: {
    display: 'inline-block',
    color: palette.text.hint,
    fontSize: 20,
  },
  [breakpoints.down('xs')]: {
    inner: {
      margin: [[40, 0]],
    },
  },
});

const title = 'Célébration de Noël';

const Christmas = ({ classes }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Jumbotron background={jumbotronImage} title={title} />

    <div className={classes.inner}>
      <Container sm>
        <RevealQueue delay={0.5}>
          <Typography variant="h6">
            L'assemblée protestante évangélique de Lyon Gerland se réjouit de
            vous accueillir pour sa célébration de Noël.
          </Typography>
          <Typography paragraph>
            <Hr />
            Ouverte à toutes et à tous, c'est l'occasion de (re)découvrir le
            message originel de Noël :{' '}
            <span aria-label="visage en plein réflexion" role="img">
              🤔
            </span>
          </Typography>
          <Typography paragraph>
            Si ce n'est plus la fête païenne de la victoire du soleil sur la
            nuit (sol invictus), christianisée au début du 4ème siècle, Noël
            n'est pas non plus la fête du petit Jésus sous le sapin au pied
            duquel le père Noël vient déposer des cadeaux par milliers. Non, le
            message du Noël chrétien est beaucoup plus profond, beaucoup plus
            dérangeant, mais aussi plus essentiel que cela. Il s'agit d'un
            message de secours et de liberté, que nous vous proposons de
            découvrir lors de cette célébration de Noël du 15 décembre.
          </Typography>
          <Typography component="div" paragraph>
            <Hr />
            <b>Déroulement :</b>
            <br />
            <ul>
              <li>9h30 : Accueil avec café et viennoiseries</li>
              <li>
                10h00 : Début de la célébration, incluant une chorale, un
                message centré sur la signification de la naissance de Jésus,
                ...
              </li>
              <li>
                11h30 : Fin. Enfin, pas tout à fait, on aime bien rester
                discuter un peu{' '}
                <span aria-label="visage souriant avec une auréole" role="img">
                  😇
                </span>
              </li>
            </ul>
          </Typography>
          <Typography paragraph>
            Si vous n'êtes pas familier du culte protestant, ou si vous êtes
            simplement curieux de son déroulement et sa signification, je vous
            encourage à consulter la page{' '}
            <Link to={routes.worship()}>"Le culte"</Link>.
          </Typography>
          <Hr xl />
          <Typography className={classes.quote}>
            « Le peuple qui marchait dans les ténèbres a vu une grande lumière,
            sur ceux qui habitaient le pays de l'ombre de la mort une lumière a
            brillé.... En effet, un enfant nous est né, un fils nous a été
            donné, et la souveraineté reposera sur son épaule ; on l'appellera
            merveilleux conseiller, Dieu puissant, Père éternel, Prince de la{' '}
            <span style={{ display: 'inline-block' }}>paix. »</span>{' '}
            <span className={classes.quoteAuthor}>— Esaïe 9.1-5</span>
          </Typography>
        </RevealQueue>
      </Container>
    </div>
  </div>
);

Christmas.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Christmas);
