import React, { Component } from "react";

import { Container, Text, Hr } from "components";

import theme from "config/theme";

class AboutUs extends Component {
  renderTitle(prefix, suffix) {
    return (
      <Text
        element="h2"
        fontSize={40}
        unit="px"
        color={theme.palette.primary[500]}
      >
        {prefix}{" "}
        <Text
          element="span"
          fontSize={40}
          unit="px"
          italic
          fontWeight="regular"
        >
          {suffix}
        </Text>
      </Text>
    );
  }

  render() {
    return (
      <div>
        <Hr xl />

        <Container sm>
          {this.renderTitle("Notre église est", "chrétienne.")}
          <Hr />
          <Text>
            Comme son nom l’indique, l’Église chrétienne est la communauté des
            disciples de Jésus-Christ. Cette communauté de croyants s’organise
            en assemblées locales (aussi appelées “paroisses”, ou “églises” avec
            un “e” minuscule), pour célébrer un culte à Dieu, pour s’instruire
            dans la Bible, et pour s’encourager mutuellement dans la foi. En
            tant que chrétiens, nous affirmons donc notre attachement à
            Jésus-Christ, qui est pleinement homme et pleinement Dieu, et nous
            le reconnaissons comme étant le seul Chef de l’Église. En communion
            avec tous les autres chrétiens de l’histoire, nous nous
            reconnaissons dans les déclarations de foi des premiers siècles
            (dites “œcuméniques”), que sont notamment le Crédo (ou “Symbole des
            Apôtres”), le Symbole de Nicée, et le Symbole dit “d’Athanase”.
          </Text>
        </Container>

        <Hr xl />

        <Container sm>
          {this.renderTitle("Notre église est", "protestante.")}
          <Hr />
          <Text>
            Vers la fin du Moyen-Âge, de plus en plus de chrétiens en Europe ont
            cherché à dénoncer les dérives et les abus de l’Église établie
            (catholique romaine), qui avait vu apparaître en son sein des
            doctrines et des pratiques étrangères à la Bible. On a appelé ces
            chrétiens des “pro-testants”, car ils “affirmaient avec conviction”
            (protestare en latin) l’enseignement inaltéré de la Bible,
            considérée comme révélation spéciale, infaillible et suffisante de
            Dieu. Ce mouvement de réforme a été très influent en Europe au XVIe
            siècle, avant d’être confronté, dans certains pays comme la France,
            à une violente opposition. Notre église s’inscrivant dans la
            continuité historique de ce mouvement, nous affirmons à notre tour
            notre attachement à la Bible comme ultime autorité en matière de foi
            et de vie.
          </Text>
        </Container>

        <Hr xl />

        <Container sm>
          {this.renderTitle("Notre église est", "réformée.")}
          <Hr />
          <Text>
            À l’origine, les églises protestantes étaient appelées “réformées”,
            car elles avaient voulu se “réformer” par un retour aux doctrines et
            aux pratiques enseignées dans la Bible. Au fil du temps, la famille
            dite “protestante” est devenue très diverse en termes de
            sensibilités et même de doctrines sur des points non-essentiels.
            Dans le même temps, l’appellation “réformée” a été retenue par les
            églises qui maintiennent un lien plus serré (historique ou
            théologique) avec les premières églises protestantes du XVIe siècle.
            Ainsi, en tant qu’église réformée, nous affirmons notre attachement
            aux principes de la réforme calviniste et aux confessions de foi
            historiques, comme la Confession de foi de La Rochelle (1559), le
            Catéchisme de Heidelberg (1563), les Canons de Dordrecht (1619), et
            particulièrement la Confession de foi de Westminster (1647).
          </Text>
        </Container>

        <Hr xl />

        <Container sm>
          {this.renderTitle("Notre église est", "évangélique.")}
          <Hr />
          <Text>
            Les églises dites “évangéliques” sont en principe caractérisées par
            l’importance qu’elles accordent à la Bible comme norme de la foi.
            Elles insistent sur la possibilité, et la nécessité, pour chacun
            d’avoir une relation personnelle avec Dieu. Elles cherchent à
            diffuser autant que possible la bonne nouvelle qui concerne la
            personne et l’œuvre de Jésus-Christ. Celui-ci est venu de la part de
            Dieu pour mourir sur la croix (prenant sur lui le poids des fautes
            de tous les croyants) et pour ressusciter le troisième jour
            (triomphant ainsi du mal et de la mort). En tant qu’église
            évangélique, nous affirmons que tous ceux qui se confient en Jésus
            pour le pardon de leurs fautes (appelées “péchés” dans la Bible)
            sont assurément réconciliés avec Dieu pour l’éternité ; nous
            cherchons à vivre une relation authentique et personnelle avec
            Dieu ; et nous avons à cœur de transmettre les enseignements de la
            Bible au plus grand nombre, de la manière la plus fidèle, la plus
            cohérente, et la plus pertinente possible.
          </Text>
        </Container>
      </div>
    );
  }
}

export default AboutUs;
