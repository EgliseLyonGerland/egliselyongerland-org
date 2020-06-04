import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';

import routes from 'utils/routes';

import picture from './jumbotron.jpg';

const styles = theme => ({
  timeBanner: {
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 32,
  },
  timeBannerText: {
    fontSize: '1.6rem',
    fontWeight: theme.typography.fontWeights.medium,
    color: '#AAAAAA',
    textAlign: 'center',
    marginTop: -8,

    '& > span': {
      display: 'inline-block',
    },
  },
  timeBannerButton: {
    position: 'absolute',
    top: '100%',
    marginTop: -16,
  },
  coffee: {
    border: 'solid 1px #222',
    display: 'inline-block',
    fontSize: rem(20),
    fontWeight: theme.typography.fontWeights.medium,
    padding: [[8, 16]],
    borderRadius: 4,
  },
  title: {
    color: theme.palette.primary[500],
  },
  covid: {
    fontSize: rem(18),
    color: '#c00',
    marginTop: 24,
    maxWidth: 400,
    fontWeight: 600,

    '& > b': {
      fontWeight: 900,
    },
  },
  subscribe: {
    fontSize: rem(18),
    marginTop: 24,
    maxWidth: 400,
    fontWeight: 600,

    '& > b': {
      fontWeight: 900,
    },
  },
  [theme.breakpoints.down('xs')]: {
    timeBannerText: {
      fontSize: '1.6rem',
    },
    coffee: {
      fontSize: rem(18),
      padding: [[8, 16]],
    },
  },
});

const Contact = ({ classes, history }) => {
  const renderTitle = title => (
    <Text
      className={classes.title}
      element="h2"
      fontSize={1.4}
      fontWeight="medium"
    >
      {title}
    </Text>
  );

  return (
    <div>
      <Helmet>
        <title>Contact</title>
      </Helmet>

      <Jumbotron background={picture} title="Contact" />

      <div className={classes.timeBanner}>
        <div className={classes.timeBannerText}>
          <span>Culte ouvert à tous,</span> <span>le dimanche à 10h.</span>
        </div>
        <div className={classes.timeBannerButton}>
          <Button
            color="primary"
            corners="circular"
            mode="plain"
            size="xs"
            onClick={() => history.push(routes.worship())}
          >
            En savoir plus sur notre culte
          </Button>
        </div>
      </div>

      <Hr multiplier={12} />

      <Container>
        <div className="row">
          <div className="col-sm-5 col-md-6">
            {/* <div className={classes.coffee}>Accueil & café à 9h30</div> */}
            <div className={classes.covid}>
              La situation sanitaire liée à l'épidémie de Covid-19 nous oblige à
              un protocole pour l'accueil du public aux réunions de l'église,
              notamment le <b>port du masque obligatoire</b> pour les plus de 11
              ans, et <b>l'inscription préalable</b>.
              <br />
              <br />
              <a href="/assets/2020/06/plan_de_reprise_des_celebrations.pdf">
                &rarr; Consulter le protocole sanitaire
              </a>
            </div>
            <div className={classes.subscribe}>
              Pour vous inscrire au prochain culte, veuillez nous envoyer un
              message par mail ou SMS (aux coordonnées ci-dessous) en{' '}
              <b>indiquant le prénom et le nom de toutes les personnes</b> qui
              seront présentes.
            </div>

            <Hr multiplier={6} />

            {renderTitle('Coordonnées')}

            <Hr multiplier={2} />

            <Text fontSize={1.4} fontWeight="regular">
              Église Lyon Gerland
            </Text>
            <Text color="#777">Réformée, Évangélique</Text>

            <Hr multiplier={3} />

            <Text>Théâtre Lulu sur la Colline</Text>
            <Text>60 Rue Victor Lagrange</Text>
            <Text>69007 Lyon</Text>

            <Hr multiplier={3} />

            <Text>Tél. : (+33) 06 79 27 38 65</Text>
            <Text>
              Email :{' '}
              <a href="mailto:contact@egliselyongerland.org">
                contact@egliselyongerland.org
              </a>
            </Text>

            <Hr multiplier={6} />

            {renderTitle('Accès')}

            <Hr multiplier={2} />

            <Text>
              <b>Arrêt Jean Macé</b>
            </Text>
            <Text>Métro B, Tram T2</Text>
            <Text>Bus 35, S3, Z16, C4, C7, C12 et C14</Text>

            <Hr multiplier={4} />
          </div>
          <div className="col-sm-7 col-md-6">
            <iframe
              allowFullScreen
              frameBorder="0"
              height="450"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.120360872194!2d4.8296063158166875!3d45.72868097910506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea28fb13f6bf%3A0x23df16c38cf568e9!2zw4lnbGlzZSBMeW9uIEdlcmxhbmQgKFLDqWZvcm3DqWUgw4l2YW5nw6lsaXF1ZSk!5e0!3m2!1sfr!2sfr!4v1505047371132"
              style={{ border: 0, width: '100%', height: 450 }}
              title="Location de l'église"
              width="100%"
            />

            <Hr multiplier={4} />
          </div>
        </div>
      </Container>
    </div>
  );
};

Contact.propTypes = {
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Contact);
