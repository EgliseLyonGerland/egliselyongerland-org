import ChurchAboutUs from 'containers/Church/AboutUs';
import ChurchWip from 'containers/Church/Wip';

import aboutUsPicture from 'containers/Church/jumbotrons/about-us.jpg';
import activityPicture from 'containers/Church/jumbotrons/activity.jpg';
import ourFaithPicture from 'containers/Church/jumbotrons/our-faith.jpg';
import worshipPicture from 'containers/Church/jumbotrons/worship.jpg';
import teamPicture from 'containers/Church/jumbotrons/team.jpg';
import federativeLinksPicture from 'containers/Church/jumbotrons/federative-links.jpg';

export default [
  {
    slug: 'qui-sommes-nous',
    title: 'Qui sommes-nous ?',
    picture: aboutUsPicture,
    component: ChurchAboutUs,
  },
  {
    slug: 'que-croyons-nous',
    title: 'Que croyons-nous ?',
    picture: ourFaithPicture,
    component: ChurchWip,
  },
  {
    slug: 'le-culte',
    title: 'Le culte',
    picture: worshipPicture,
    component: ChurchWip,
  },
  {
    slug: 'activites',
    title: 'Activités',
    picture: activityPicture,
    component: ChurchWip,
  },
  {
    slug: 'l-equipe',
    title: "L'équipe",
    picture: teamPicture,
    component: ChurchWip,
  },
  {
    slug: 'liens-federatifs',
    title: 'Liens fédératifs',
    picture: federativeLinksPicture,
    component: ChurchWip,
  },
];
