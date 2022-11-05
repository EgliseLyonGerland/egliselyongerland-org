import React from 'react';
import Helmet from 'react-helmet';
import { Button, Typography } from '@material-ui/core';

import Jumbotron from 'components/Jumbotron/Jumbotron';
import Container from 'components/Container/Container';
import Hr from 'components/Hr/Hr';

import jumbotronImage from './images/jumbotron.jpg';

const title = 'En Avent la prière 2022';

const Christmas = () => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    <Jumbotron background={jumbotronImage} title={title} />
    <Hr multiplier={4} />
    <Container sm>
      <Typography paragraph>
        “En Avent la prière !” c’est l’occasion d’apprendre à mieux connaître un
        frère ou une sœur et de prier pour cette personne en particulier pendant
        toute la période de l’Avent.
      </Typography>
      <Typography paragraph>
        La personne pour qui vous devrez prier sera tirée au sort (grâce à un
        algorithme ultra puissant !) parmi les autres participants, formant
        ainsi une chaîne de prière.
      </Typography>
      <Typography paragraph>
        Le nom de cette personne vous sera remis à la fin du culte du premier
        dimanche de l’Avent, le 27 novembre prochain. Sachez qu’en cas
        d’absence, vous recevrez également le nom de la personne par email.
      </Typography>
      <Typography paragraph>
        À partir de cette date, vous vous engagez à prier secrètement pour cette
        personne tous les jours pendant toute la période de l’Avent, jusqu’au 25
        décembre donc.
      </Typography>
      <Typography paragraph>
        Et ce n’est qu’à partir de cette date que l’opération prendra fin et que
        vous pourrez (enfin) vous dévoiler auprès de la personne, si possible,
        en lui offrant un cadeau d’une valeur symbolique de 5€ maximum.
      </Typography>
      <Typography paragraph>
        Pour vous inscrire, il suffit simplement de cliquer sur le bouton
        ci-dessous. Vous accéderez à un formulaire qui vous demandera de
        renseigner votre prénom et nom, votre email, votre tranche d’âge et,
        petite nouveauté cette année, une photo qui permettra à la personne qui
        recevra votre nom de vous reconnaître plus facilement.
      </Typography>
      <Typography paragraph>À noter :</Typography>
      <ul>
        <li>
          <Typography>
            L’inscription à l’opération est accessible à partir de 6 ans. Des
            groupes d’âge seront créés en fonction des participants.
          </Typography>
        </li>
        <li>
          <Typography>
            Il est déjà arrivé qu’une personne n'ait jamais l'occasion de
            rencontrer celle pour qui elle était censée prier. Donc si vous
            pensez être absent à au moins deux des quatre cultes, il serait
            alors préférable de ne pas participer à l’opération.
          </Typography>
        </li>
        <li>
          <Typography>
            Les inscriptions prendront fin le mardi 22 novembre à minuit.
          </Typography>
        </li>
      </ul>

      <Hr multiplier={8} />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component="a"
          size="large"
          color="primary"
          variant="contained"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdnT5phcq5ghHI9qUeXVzQNE80U9JLLg092abvetn1FKNJKfA/viewform"
          target="_blank"
        >
          Accéder au formulaire d'inscription
        </Button>
      </div>
    </Container>
  </div>
);

export default Christmas;
