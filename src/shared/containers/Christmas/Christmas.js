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
      <Container md>
        <RevealQueue delay={0.5}>
          <Typography variant="h5">
            La paroisse protestante de Lyon Gerland se réjouit de vous
            accueillir pour sa célébration de Noël.
            <Hr />
          </Typography>
          <Typography component="div" paragraph>
            <div style={{ float: 'right', margin: 16 }}>
              <iframe
                allow="encrypted-media"
                allowTransparency
                frameBorder="0"
                height="350"
                scrolling="no"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fegliselyongerland%2F&tabs=events&width=340&height=350&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId=139041246774067"
                style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
                title="Page de l'évènement Facebook"
                width="340"
              />
            </div>
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
            proposons de découvrir lors de cette célébration de Noël du 15
            décembre.
            <br />
            <br />
            <b>Déroulement :</b>
            <br />
            <ul>
              <li>9h30 : Accueil avec café et viennoiseries</li>
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
            <br />
            Si vous n'êtes pas familier du culte protestant, ou si vous êtes
            simplement curieux de son déroulement et de sa signification,
            n'hésitez pas à consulter la page{' '}
            <Link to={routes.worship()}>"Le culte"</Link>.
          </Typography>
          <Typography className={classes.quote}>
            <Hr xl />« Le peuple qui marchait dans les ténèbres a vu une grande
            lumière, sur ceux qui habitaient le pays de l'ombre de la mort une
            lumière a brillé.... En effet, un enfant nous est né, un fils nous a
            été donné, et la souveraineté reposera sur son épaule ; on
            l'appellera merveilleux conseiller, Dieu puissant, Père éternel,
            Prince de la{' '}
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
