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
import titleImage from './images/title.png';

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

    <Jumbotron background={jumbotronImage}>
      <img
        src={titleImage}
        style={{ maxWidth: '100%', padding: 16, display: 'block' }}
        alt="Célébration Protestante de Noël"
      />
    </Jumbotron>

    <div className={classes.inner}>
      <Container sm>
        <RevealQueue delay={0.5}>
          <Typography variant="h5">
            La paroisse protestante de Lyon Gerland se réjouit de vous
            accueillir pour sa célébration de Noël.
            <Hr />
          </Typography>
          <Typography component="div" paragraph>
            Ouverte à tous, c'est l'occasion de (re)découvrir le message
            originel de Noël !<br />
            <br />
            Si ce n'est plus la fête païenne de la victoire du soleil sur la
            nuit (sol invictus), christianisée au début du 4ème siècle, Noël
            n'est pas non plus la fête du petit Jésus sous le sapin, au pied
            duquel le père Noël vient déposer des cadeaux par milliers ! Non, le
            message du Noël chrétien est beaucoup plus profond, peut-être plus
            dérangeant aussi, mais certainement plus pertinent que jamais. Il
            s'agit d'un message de secours et de liberté, que nous vous
            proposons de découvrir lors de cette célébration de Noël du 18
            décembre.
            <br />
            <br />
            <b>Déroulement :</b>
            <br />
            <ul>
              <li>9h30 : Accueil</li>
              <li>
                10h00 : Début de la célébration, avec des chants, la lecture de
                l'histoire de Noël, un message centré sur la signification de la
                naissance de Jésus...
              </li>
              <li>
                11h30 : Fin. Enfin, pas tout à fait, on aime bien rester
                discuter un peu !
              </li>
            </ul>
            <b>Lieu :</b>
            <div style={{ paddingLeft: 16 }}>
              <br />
              Théâtre Lulu
              <br />
              60 Rue Victor Lagrange - Lyon 7e
              <br />
              Plus d'info sur la page{' '}
              <Link to={routes.contact()}>"Contact"</Link>
            </div>
            <br />
            Visitez la page Facebook de l'évènement :{' '}
            <a
              href="https://www.facebook.com/events/1781928982177490"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/events/1781928982177490
            </a>
            <br />
            <br />
            Si vous n'êtes pas familier du culte protestant, ou si vous êtes
            simplement curieux de son déroulement et de sa signification,
            n'hésitez pas à consulter la page{' '}
            <Link to={routes.worship()}>"Le culte"</Link>.
          </Typography>
          <Typography className={classes.quote}>
            <Hr xl />« L'ange leur dit : Soyez sans crainte, car je vous annonce
            la bonne nouvelle d'une grande joie qui sera pour tout le peuple :
            aujourd'hui, dans la ville de David, il vous est né un Sauveur, qui
            est le Christ, le Seigneur. Et ceci sera pour vous un signe : vous
            trouverez un nouveau-né emmailloté et couché dans une crèche. Et
            soudain il se joignit à l'ange une multitude de l'armée céleste, qui
            louait Dieu et disait : Gloire à Dieu dans les lieux très hauts, et
            paix sur la terre parmi les hommes qu'il agrée ! »{' '}
            <span className={classes.quoteAuthor}>— Luc 2 • 10-14</span>
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
