import React from 'react';

import Container from 'components/Container/Container';
import Typography from 'components/Typography/Typography';
import RevealQueue from 'components/Animation/RevealQueue';
import Hr from 'components/Hr/Hr';

const AboutUs = () => (
  <div>
    <Hr xl />

    <RevealQueue delay={0.2} offset={100}>
      <Container sm>
        <Typography paragraph>
          Le culte chrétien, dans la Bible, désigne avant tout une entière
          consécration à Dieu. Rendre un culte à Dieu, c’est chercher à le
          connaître et à l’honorer dans tous les domaines de la vie.
        </Typography>
        <Typography paragraph>
          Dans un sens plus étroit, les chrétiens se retrouvent habituellement
          le dimanche pour un "culte", c’est-à-dire pour un temps où ils adorent
          Dieu ensemble, notamment par des chants, par des prières, et par la
          lecture et l’étude de la Bible.
        </Typography>
        <Typography paragraph>
          À l’Église Lyon Gerland, la rencontre du dimanche est ouverte à tous,
          et dure 1h30 environ. Nous cherchons à ce que ce rendez-vous soit :
        </Typography>
        <Typography component="ul" paragraph>
          <li>
            centré sur Dieu, car c’est lui qui nous invite à lui rendre un culte
            ;
          </li>
          <li>
            biblique, c’est-à-dire qui reflète le mieux possible le message de
            la Bible ;
          </li>
          <li>
            compréhensible au plus grand nombre, car l’Église s’adresse à tout
            le monde.
          </li>
        </Typography>
        <Typography paragraph>Que s’y passe-t-il habituellement ?</Typography>
        <Typography component="ul" paragraph>
          <li>
            Nous chantons ensemble des chants d’origine récente ou plus
            ancienne, avec simplicité.
          </li>
          <li>
            Des responsables lisent des passages tirés de la Bible, et
            conduisent l’ensemble de l’assemblée dans la prière.
          </li>
          <li>
            Une personne qualifiée présente une prédication, c’est-à-dire la
            lecture et l’explication d’un passage de la Bible, avec des
            applications pratiques pour aujourd’hui.
          </li>
          <li>
            Nous partageons la sainte-cène, que d’autres traditions chrétiennes
            appellent "le repas du Seigneur", "la communion", ou
            "l’eucharistie". Du pain et du vin sont distribués dans l’assemblée,
            à destination des chrétiens, comme commémoration de la mort et de la
            résurrection de Jésus-Christ, et comme moyen de fortifier la foi des
            croyants.
          </li>
          <li>
            À l’issue du culte, le verre de l’amitié permet de prolonger la
            convivialité et de faire plus ample connaissance les uns avec les
            autres.
          </li>
        </Typography>
        <Typography paragraph>
          Une semaine sur deux, un club biblique est proposé aux enfants de 4 à
          10 ans, pendant le temps de la prédication. Un enseignement tiré de la
          Bible leur est proposé de façon adaptée à leur âge. Il y a aussi un
          espace garderie sur place pour les plus jeunes (0-3 ans). Un programme
          d’éveil à la foi leur est également proposé.
        </Typography>
        <Typography paragraph>
          N’hésitez pas à nous rendre visite un dimanche. Vous êtes les
          bienvenus !
        </Typography>
        <Typography paragraph>
          "Le culte religieux ordinaire de Dieu comprend : la lecture des
          Écritures faite dans la crainte de Dieu, une solide prédication et
          l’écoute attentive de la Parole dans l’obéissance à Dieu, et avec
          intelligence, foi et respect, le chant des psaumes avec la grâce dans
          le cœur, comme aussi une juste administration et une digne réception
          des sacrements institués par Christ."
          <Typography color="textSecondary" component="span">
            <em>(Confession de foi de Westminster, article XXI.5)</em>
          </Typography>
        </Typography>
        <Typography paragraph>
          "Quoi que vous fassiez, faites tout pour la gloire de Dieu."
          <Typography color="textSecondary" component="span">
            <em>(1 Corinthiens 10.31)</em>
          </Typography>
        </Typography>
      </Container>
    </RevealQueue>
  </div>
);

export default AboutUs;
