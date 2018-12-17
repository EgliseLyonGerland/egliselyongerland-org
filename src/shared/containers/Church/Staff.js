import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from 'components/Typography/Typography';
import Hr from 'components/Hr/Hr';
import Elder from './components/Elder';

import alexPicture from './images/alex.jpg';
import denisPicture from './images/denis.jpg';
import jonahPicture from './images/jonah.jpg';

const styles = () => ({});

const Staff = (/* { classes } */) => (
  <>
    <Elder name="Alexandre Sarran" picture={alexPicture} first>
      <Typography>
        Alexandre est diplômé en musicologie (Université Lumière{' '}
        <span style={{ whiteSpace: 'nowrap' }}>Lyon 2</span>) et en théologie
        (Faculté Jean Calvin, Aix-en-Provence), il éprouve beaucoup de joie à
        étudier la Bible et à en partager le message avec d'autres. Ses
        passe-temps favoris ?
      </Typography>
      <Typography paragraph>
        L'escalade, la randonnée, ou le ski ! Alexandre est le mari (privilégié)
        de Suzanne, et le père (débordé) de six enfants.
      </Typography>
    </Elder>
    <Hr xl />
    <Elder name="Jonah Haddad" picture={jonahPicture} inverted>
      <Typography>
        Jonah a fait des études de philosophie qui l'ont conduit jusqu'à la
        maîtrise, puis il a fait un master en théologie à distance avec la
        Faculté de Théologie Évangélique de Louvain, en Belgique. Il prépare
        maintenant un doctorat.
      </Typography>
      <Typography paragraph>
        Jonah est le mari d'Amy, avec qui il a quatre enfants. Il aime étudier,
        prêcher à l’église, et dans son temps libre, faire du sport. Jonah a un
        petit faible pour les randonnées dans la nature.
      </Typography>
    </Elder>
    <Hr xl />
    <Elder name="Denis Blum" picture={denisPicture} last>
      <Typography>
        Denis est médecin généraliste, parfois en cabinet, parfois aux urgences.
        Il est marié avec Maïlys avec qui il s'occupe du groupe d'ados. Il aime
        étudier la Bible et rendre son message accessible à tous.
      </Typography>
      <Typography paragraph>
        Il aime aussi beaucoup la montagne. Il n'est pas rare qu'entre deux
        gardes, Denis enfile vite ses chaussons d'escalade et aille grimper !
      </Typography>
    </Elder>
  </>
);

export default withStyles(styles)(Staff);