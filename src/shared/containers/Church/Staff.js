import React from 'react';

import Typography from 'components/Typography/Typography';
import Elder from './components/Elder';

import alexPicture from './images/alex.jpg';
import denisPicture from './images/denis.jpg';
import jonahPicture from './images/jonah.jpg';

const Staff = () => (
  <>
    <Elder name="Alexandre Sarran" picture={alexPicture} first>
      <Typography variant="subtitle1">
        <b>Pasteur</b>
      </Typography>
      <Typography paragraph>
        Je suis diplômé en musicologie (Université Lumière{' '}
        <span style={{ whiteSpace: 'nowrap' }}>Lyon 2</span>) et en théologie
        (Faculté Jean Calvin, Aix-en-Provence). J’éprouve beaucoup de joie à
        étudier la Bible et à en partager le message avec d’autres.
      </Typography>
      <Typography>
        Mes passe-temps favoris ? L’escalade, la randonnée, ou le ski ! Je suis
        le mari (privilégié) de Suzanne, et le père (débordé) de six enfants.
      </Typography>
    </Elder>
    <Elder name="Jonah Haddad" picture={jonahPicture} inverted>
      <Typography variant="subtitle1">
        <b>Ancien</b>
      </Typography>
      <Typography paragraph>
        J’ai fait des études de philosophie qui m’ont conduit jusqu’à la
        maîtrise, puis j’ai fait un master en théologie à distance avec la
        Faculté de Théologie Évangélique de Louvain, en Belgique. Je prépare
        maintenant un doctorat.
      </Typography>
      <Typography>
        Je suis le mari d’Amy, avec qui j’ai quatre enfants. J’aime étudier,
        prêcher à l’église, et dans mon temps libre, faire du sport. J’ai un
        petit faible pour les randonnées dans la nature.
      </Typography>
    </Elder>
    <Elder name="Denis Blum" picture={denisPicture} last>
      <Typography variant="subtitle1">
        <b>Ancien</b>
      </Typography>
      <Typography paragraph>
        Je suis médecin généraliste, parfois en cabinet, parfois aux urgences.
        Je suis marié avec Maïlys avec qui je m’occupe du groupe d’ados. J’aime
        étudier la Bible et rendre son message accessible à tous.
      </Typography>
      <Typography>
        J’aime aussi beaucoup la montagne. Il n’est pas rare qu’entre deux
        gardes, j’enfile vite mes chaussons d’escalade et aille grimper !
      </Typography>
    </Elder>
  </>
);

export default Staff;
