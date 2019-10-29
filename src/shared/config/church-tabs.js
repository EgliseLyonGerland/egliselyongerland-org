import loadable from 'react-loadable';

import aboutUsPicture from 'containers/Church/images/jumbotrons/about-us.jpg';
// import activityPicture from 'containers/Church/images/jumbotrons/activity.jpg';
import ourFaithPicture from 'containers/Church/images/jumbotrons/our-faith.jpg';
import worshipPicture from 'containers/Church/images/jumbotrons/worship.jpg';
import teamPicture from 'containers/Church/images/jumbotrons/team.jpg';
// import federativeLinksPicture from 'containers/Church/images/jumbotrons/federative-links.jpg';

// const AsyncChurchWip = loadable({
//   loader: () =>
//     import(/* webpackChunkName: "church-wip" */ 'containers/Church/Wip'),
//   loading: () => null,
// });

export default [
  {
    slug: 'qui-sommes-nous',
    title: 'Qui sommes-nous ?',
    picture: aboutUsPicture,
    component: loadable({
      loader: () =>
        import(
          /* webpackChunkName: "church-aboutus" */ 'containers/Church/AboutUs'
        ),
      loading: () => null,
    }),
  },
  {
    slug: 'que-croyons-nous',
    title: 'Que croyons-nous ?',
    picture: ourFaithPicture,
    component: loadable({
      loader: () =>
        import(
          /* webpackChunkName: "church-ourfaith" */ 'containers/Church/OurFaith'
        ),
      loading: () => null,
    }),
  },
  {
    slug: 'le-culte',
    title: 'Le culte',
    picture: worshipPicture,
    component: loadable({
      loader: () =>
        import(
          /* webpackChunkName: "church-worship" */ 'containers/Church/Worship'
        ),
      loading: () => null,
    }),
  },
  // {
  //   slug: 'activites',
  //   title: 'Activités',
  //   picture: activityPicture,
  //   component: AsyncChurchWip,
  // },
  {
    slug: 'l-equipe',
    title: "L'équipe",
    picture: teamPicture,
    component: loadable({
      loader: () =>
        import(
          /* webpackChunkName: "church-staff" */ 'containers/Church/Staff'
        ),
      loading: () => null,
    }),
  },
  // {
  //   slug: 'liens-federatifs',
  //   title: 'Liens fédératifs',
  //   picture: federativeLinksPicture,
  //   component: AsyncChurchWip,
  // },
];
