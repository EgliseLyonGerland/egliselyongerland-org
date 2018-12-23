import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import RevealQueue from 'components/Animation/RevealQueue';

const styles = ({ typography, palette, breakpoints }) => ({
  quote: {
    fontWeight: typography.fontWeights.regular,
    fontStyle: 'italic',
    color: palette.text.primary,
    fontSize: 32,
    lineHeight: 1.3,
    textAlign: 'center',
  },
  quoteAuthor: {
    display: 'inline-block',
    color: palette.text.hint,
    fontSize: 20,
  },
  [breakpoints.down('xxs')]: {
    quote: {
      fontSize: 22,
    },
    quoteAuthor: {
      fontSize: 18,
    },
  },
});

const Worship = ({ classes }) => (
  <Container sm>
    <RevealQueue delay={0.2}>
      <Typography className={classes.quote}>
        « Le but principal de la vie de l’homme est de glorifier Dieu et de
        trouver en lui son bonheur éternel. »{' '}
        <span className={classes.quoteAuthor}>
          — Petit Catéchisme de Westminster
        </span>
      </Typography>
      <Typography paragraph>
        La Déclaration de foi du Conseil National des Évangéliques de France
        résume bien les éléments essentiels de la foi chrétienne :
      </Typography>
      <Typography component="div" italic>
        <Typography gutterBottom>« Nous croyons :</Typography>
        <Typography component="ul" gutterBottom>
          <li>
            Que l’Écriture Sainte est la Parole infaillible de Dieu, autorité
            souveraine en matière de foi et de vie.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            {' '}
            En un seul Dieu, Père, Fils et Saint-Esprit de toute éternité.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            En Jésus-Christ notre Seigneur, Dieu manifesté en chair, né de la
            vierge Marie, à son humanité exempte de péché, ses miracles, sa mort
            expiatoire et rédemptrice, sa résurrection corporelle, son
            ascension, son œuvre médiatrice, son retour personnel dans la
            puissance et dans la gloire.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            Au salut de l’homme pécheur et perdu, à sa justification, non par
            les œuvres mais par la seule foi, grâce au sang versé par
            Jésus-Christ notre Seigneur, à sa régénération par le Saint-Esprit.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            En l’Esprit-Saint qui, venant demeurer en nous, nous donne le
            pouvoir de servir Jésus-Christ, de vivre une vie sainte et de rendre
            témoignage.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            À l’unité véritable dans le Saint-Esprit de tous les croyants
            formant ensemble l’Église Universelle, corps du Christ.
          </li>
        </Typography>
        <Typography component="ul" gutterBottom>
          <li>
            À la résurrection de tous : ceux qui sont perdus ressusciteront pour
            le jugement, ceux qui sont sauvés ressusciteront pour la vie. »
          </li>
        </Typography>
      </Typography>
      <Typography paragraph>
        Par ailleurs, en tant qu’église réformée, nous nous inscrivons dans la
        lignée historique et théologique des premiers protestants. Nous
        considérons que la Confession de foi de Westminster en particulier, et
        le Petit Catéchisme de Westminster (1647), présentent une bonne synthèse
        de la foi biblique.
      </Typography>
      <Typography paragraph>
        <a href="/static/Confession_de_foi_de_Westminster.pdf" target="_blank">
          Télécharger la confession de foi de Westminster
        </a>
      </Typography>
    </RevealQueue>
  </Container>
);

Worship.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Worship);
