import loadable from 'react-loadable';

import aboutUsPicture from 'containers/Church/jumbotrons/about-us.jpg';
import activityPicture from 'containers/Church/jumbotrons/activity.jpg';
import ourFaithPicture from 'containers/Church/jumbotrons/our-faith.jpg';
import worshipPicture from 'containers/Church/jumbotrons/worship.jpg';
import teamPicture from 'containers/Church/jumbotrons/team.jpg';
import federativeLinksPicture from 'containers/Church/jumbotrons/federative-links.jpg';

const AsyncChurchWip = loadable({
  loader: () =>
    import(/* webpackChunkName: "church-wip" */ 'containers/Church/Wip'),
  loading: () => null,
});

export default [
  {
    slug: 'qui-sommes-nous',
    title: 'Qui sommes-nous ?',
    picture: aboutUsPicture,
    component: loadable({
      loader: () =>
        import(/* webpackChunkName: "church-aboutus" */ 'containers/Church/AboutUs'),
      loading: () => null,
    }),
  },
  {
    slug: 'que-croyons-nous',
    title: 'Que croyons-nous ?',
    picture: ourFaithPicture,
    component: AsyncChurchWip,
  },
  {
    slug: 'le-culte',
    title: 'Le culte',
    picture: worshipPicture,
    component: AsyncChurchWip,
  },
  {
    slug: 'activites',
    title: 'Activités',
    picture: activityPicture,
    component: AsyncChurchWip,
  },
  {
    slug: 'l-equipe',
    title: "L'équipe",
    picture: teamPicture,
    component: AsyncChurchWip,
  },
  {
    slug: 'liens-federatifs',
    title: 'Liens fédératifs',
    picture: federativeLinksPicture,
    component: AsyncChurchWip,
  },
];
