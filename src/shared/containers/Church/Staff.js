import React from 'react';

import Typography from 'components/Typography/Typography';
import Elder from './components/Elder';

import alexPicture from './images/alex.jpg';
import denisPicture from './images/denis.jpg';
import kalhouPicture from './images/kalhou.jpg';

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
    <Elder name="Denis Blum" picture={denisPicture} inverted>
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
    <Elder name="Kalhou Vang" picture={kalhouPicture} last>
      <Typography variant="subtitle1">
        <b>Ancien</b>
      </Typography>
      <Typography paragraph>
        Je suis ingénieur et je travaille dans l’industrie. Mon livre préféré
        dans le rayon théologie est le précis de doctrine chrétienne de Louis
        Berkhof. J’aime aussi écouter R.C. Sproul.
      </Typography>
      <Typography paragraph>
        Je suis marié à Soohyun et nous avons deux enfants. Je ne pense pas
        avoir de loisir préféré, mais je ne m’ennuie que rarement...
      </Typography>
      <Typography>
        En réfléchissant à cette question, je croise la pensée de C.S. Lewis :
        si je découvre en moi un désir qu’aucune expérience au monde ne puisse
        satisfaire, l’explication plausible ne serait-elle pas que je suis fait
        pour un autre monde ?
      </Typography>
    </Elder>
  </>
);

export default Staff;
