import React from 'react';

import Typography from 'components/Typography/Typography';
import Elder from './components/Elder';

import alexPicture from './images/alex.jpg';
import denisPicture from './images/denis.jpg';
import kalhouPicture from './images/kalhou.jpg';
import joshuaPicture from './images/joshua.jpg';
import antoinePicture from './images/antoine.jpg';

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
    <Elder name="Kalhou Vang" picture={kalhouPicture}>
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
    <Elder name="Joshua Jacobs" picture={joshuaPicture} inverted>
      <Typography variant="subtitle1">
        <b>Pasteur assistant</b>
      </Typography>
      <Typography paragraph>
        Arrivé en France en 2018 après avoir obtenu mon master en théologie aux
        États-Unis, je suis heureux de pouvoir maintenant servir le Seigneur à
        temps plein.
      </Typography>
      <Typography paragraph>
        Je suis marié à ma chère colmarienne Charline avec qui nous avons un
        enfant. Durant mon temps libre, j’aime faire du vélo de route ou
        pratiquer le body combat mais aussi profiter de la gastronomie
        française.
      </Typography>
    </Elder>
    <Elder name="Antoine Fréchet" picture={antoinePicture}>
      <Typography variant="subtitle1">
        <b>Pasteur stagiaire</b>
      </Typography>
      <Typography paragraph>
        Marié à Noémie et père de 2 enfants, je suis étudiant de 2ème cycle à la
        Faculté Jean Calvin d’Aix-en-Provence. J’aime me rappeler que mon unique
        assurance dans la vie comme dans la mort, c’est d’appartenir, corps et
        âme, non pas à moi-même mais à Jésus-Christ mon fidèle sauveur ; et le
        fait de contribuer au développement de son Église et à la formation de
        disciples me procure une grande joie.
      </Typography>
      <Typography paragraph>
        J’apprécie beaucoup partir à l’aventure avec ma famille que ce soit en
        vélo, en randonnée, en escalade… toujours avec un bon livre dans le sac
        !
      </Typography>
    </Elder>
  </>
);

export default Staff;
