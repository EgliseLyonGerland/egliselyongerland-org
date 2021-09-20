import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import format from 'date-fns/format';
import locale from 'date-fns/locale/fr';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';

import routes from 'utils/routes';

import picture from './jumbotron.jpg';

const locations = {
  saintIrenee: {
    name: 'Salle Saint Irénée',
    address: ['37 rue Félix Brun', '69007 Lyon'],
    access: ['Métro B, arrêt Place Jean Jaurès'],
    gmap:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1378.537058835475!2d4.831138835290314!3d45.73805705581388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea31094ee287%3A0x85a608e54e9ebe76!2s37%20Rue%20F%C3%A9lix%20Brun%2C%2069007%20Lyon!5e0!3m2!1sfr!2sfr!4v1630345666281!5m2!1sfr!2sfr',
  },
};

const worships = [
  {
    date: new Date('2021-10-10 10:00'),
    location: locations.saintIrenee,
  },
  {
    date: new Date('2021-10-03 10:00'),
    location: locations.saintIrenee,
  },
  {
    date: new Date('2021-09-26 10:00'),
    location: locations.saintIrenee,
  },
];

const now = new Date().setHours(0);
const nextWorship = worships.reduce(
  (acc, item) => (item.date >= now ? item : acc),
  null,
);

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
  alert: {
    background: '#E7BB41',
    fontSize: rem(20),
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: 1.3,
    color: 'white',
    padding: 24,
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
          <span>Note culte est ouvert à tous.</span>
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
        <div className={classes.alert}>
          ATTENTION : les conditions sanitaires et la règlementation actuelle
          entraînent ces jours-ci un changement fréquent de lieu de culte pour
          notre église !
          <Hr multiplier={2} />
          Pensez à visiter régulièrement notre site internet pour obtenir les
          dernières informations. En cas de doute, n'hésitez pas à envoyer un
          email à{' '}
          <a href="mailto:contact@egliselyongerland.org">
            contact@egliselyongerland.org
          </a>
          , et demandez à être ajouté à la liste de diffusion de l'église.
          <Hr multiplier={2} />
          Merci de votre compréhension !
        </div>
        <Hr multiplier={4} />

        <div className="row">
          <div className="col-sm-5 col-md-6">
            {/* <div className={classes.coffee}>Accueil & café à 9h30</div> */}

            {renderTitle('Coordonnées')}

            <Hr multiplier={2} />

            <Text fontSize={1.4} fontWeight="regular">
              Église Lyon Gerland
            </Text>
            <Text color="#777">Réformée, Évangélique</Text>

            {/* <Hr multiplier={3} />
            <div
              className={classes.address}
              style={{
                color: '#F0544F',
                fontSize: '1em',
                fontWeight: 'bold',
              }}
            >
              Dimanche 22 août :
            </div>

            <Hr xs />
            <Text fontWeight="medium">Théâtre de Lulu sur la Colline</Text>
            <Text>60 avenue Victor Lagrange</Text>
            <Text>69007 Lyon</Text> */}

            <Hr multiplier={3} />

            <Text>Tél. : (+33) 06 79 27 38 65</Text>
            <Text>
              Email :{' '}
              <a href="mailto:contact@egliselyongerland.org">
                contact@egliselyongerland.org
              </a>
            </Text>

            {/* <Hr multiplier={6} />

            {renderTitle('Accès')}

            <Hr multiplier={2} />

            <Text>
              <b>Arrêt Jean Macé</b>
            </Text>
            <Text>Métro B, Tram T2</Text>
            <Text>Bus 35, S3, Z16, C4, C7, C12 et C14</Text> */}

            <Hr multiplier={4} />
            {renderTitle('Lieu et horaire du culte')}

            <Hr multiplier={2} />

            {nextWorship && (
              <div>
                <div
                  className={classes.address}
                  style={{
                    color: '#F0544F',
                    fontSize: '1.2em',
                    fontWeight: 'bold',
                  }}
                >
                  Dimanche{' '}
                  {nextWorship.date.getDate() === 1
                    ? '1er'
                    : nextWorship.date.getDate()}{' '}
                  {format(nextWorship.date, 'MMMM', { locale })}, culte à{' '}
                  {nextWorship.date.getHours()}h :
                </div>
                <Hr xs />
                <Text fontWeight="regular">{nextWorship.location.name}</Text>
                {nextWorship.location.address.map(line => (
                  <Text key={line}>{line}</Text>
                ))}
                <Hr multiplier={2} />
                <Text fontWeight="medium">Accès</Text>
                {nextWorship.location.access.map(line => (
                  <Text key={line}>{line}</Text>
                ))}
              </div>
            )}
          </div>
          <div className="col-sm-7 col-md-6">
            {nextWorship && (
              <iframe
                allowFullScreen
                frameBorder="0"
                height="450"
                src={nextWorship.location.gmap}
                style={{ border: 0, width: '100%', height: 450 }}
                title="Location de l'église"
                width="100%"
              />
            )}

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
