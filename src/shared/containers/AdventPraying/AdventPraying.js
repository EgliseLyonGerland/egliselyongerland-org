import React from 'react';
import Helmet from 'react-helmet';

import Jumbotron from 'components/Jumbotron/Jumbotron';
import Container from 'components/Container/Container';
import Hr from 'components/Hr/Hr';

import jumbotronImage from './images/jumbotron.jpg';

const title = 'En Avent la prière';

const Christmas = () => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Jumbotron background={jumbotronImage} title={title} />

    <Hr multiplier={12} />

    <Container lg>
      <iframe
        title="En Avent la prière - Inscriptions 2021"
        src="https://docs.google.com/forms/d/e/1FAIpQLSf7mW-yZmEefZlQBHfzBp7GEWd08Ury9tYLtwxkWk1MH6ycaw/viewform?embedded=true"
        width="100%"
        height="2000"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
      >
        Chargement…
      </iframe>
    </Container>
  </div>
);

export default Christmas;
