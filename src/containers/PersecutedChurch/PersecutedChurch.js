import React, { Component } from 'react';

import Helmet from 'react-helmet';

import { Container, Jumbotron, Image, Text, Hr } from 'components';

import jumbotron from './jumbotron.jpg';
import prayer from './prayer.jpg';
import openDoors from './open-doors.jpg';

class PersecutedChurch extends Component {
  render() {
    return (
      <div>
        <Helmet title="L'Église persécutée" />

        <Jumbotron background={jumbotron} title="L'église persécutée" />

        <Hr xl />

        <Container sm>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Proin eget eros vitae dolor tempus fringilla. Nullam vel
            tempus mi, nec aliquet tortor. Duis pulvinar ante quis lorem
            tincidunt, dapibus dignissim libero consectetur. Donec in
            ligula dapibus, lacinia nisl sit amet, condimentum quam.
            Morbi luctus risus nisl, quis dictum enim pretium id.
            In iaculis rutrum justo. Suspendisse posuere molestie dictum.
            In porttitor felis vitae tortor rutrum, ac porttitor leo euismod.
            Fusce sit amet ante felis. Morbi purus urna, interdum vel auctor a,
            posuere ac tellus. Vivamus cursus imperdiet fermentum.
          </Text>
          <Hr />
          <Text>
            Nam commodo luctus scelerisque. Vivamus posuere velit odio,
            ut condimentum sapien viverra eget. Integer sit amet augue
            at leo pellentesque viverra. Nullam finibus nulla neque,
            vitae maximus mi mattis ut. Nunc mauris eros, tempor ut
            dictum id, lacinia eu sapien. Cras convallis sem gravida,
            sollicitudin augue consectetur, viverra ipsum. Integer
            facilisis ac est ornare convallis. Mauris tincidunt finibus
            urna eget varius. Donec id metus a massa elementum pulvinar
            sed ut lorem. Nullam mollis urna justo, a consequat nulla
            gravida dictum. Etiam pellentesque lectus lorem, vitae efficitur
            arcu ultricies sed. Maecenas non dapibus sem. Nulla eu odio
            vel metus pulvinar ornare dapibus id purus.
          </Text>
        </Container>
        <Hr xl />
        <Container xl>
          <Image src={prayer} />
        </Container>
        <Hr xl />
        <Container sm>
          <Text>
            Curabitur ut nibh augue. Pellentesque accumsan mollis est sed
            interdum. Nullam velit quam, tempor ut tempus ut, cursus id enim.
            Aenean venenatis consequat sapien vulputate accumsan. Class aptent
            taciti sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Aliquam ornare leo eu ante lobortis, eget dapibus odio
            fermentum. Nunc pulvinar turpis nec tristique varius. Nam sodales
            lorem quis arcu finibus, at dignissim ex commodo. Etiam laoreet
            aliquam sodales. Nunc ac nunc ut nisl venenatis sagittis et vel erat.
            Vivamus sollicitudin nisi erat, sed mattis odio auctor non. Sed
            ornare scelerisque ipsum, sed tristique odio varius at.
          </Text>
        </Container>
        <Hr />
        <Container>
          <div className="row">
            <div className="col-xs-4">
              <Image src={openDoors} ratio={1} />
              <Hr />
            </div>
            <div className="col-xs-12 col-sm-7">
              <Text>
                Etiam eleifend ipsum eu feugiat eleifend. Curabitur vulputate egestas
                neque, bibendum fermentum mauris. Cras id est ante. Ut auctor lacus
                ac dui posuere, vitae convallis dolor accumsan. Duis ut interdum
                dolor. Donec id eleifend odio. Aenean lectus diam, tincidunt nec
                ex ut, congue dignissim nunc. Nunc iaculis aliquet vehicula.
                Cras pulvinar tincidunt dolor id mollis. Etiam in justo eu ligula
                euismod mollis. Fusce dictum est quis tempor laoreet. Duis pulvinar
                auctor leo, non efficitur ante imperdiet sed. Donec vel nulla erat.
                In interdum condimentum massa sed ultrices. Proin vel metus erat.
                Aenean id ex cursus neque congue vulputate. In eu felis quis massa
                viverra porttitor.
              </Text>
              <Hr />
            </div>
          </div>
        </Container>
        <Container sm>
          <Text>
            Vestibulum rhoncus felis nec tellus vehicula, a placerat dolor
            varius. Suspendisse quis ornare dui. Donec nec tristique ipsum.
            Curabitur sed porta quam. Nam hendrerit nec mi et rhoncus. Phasellus
            placerat, nulla ut congue rutrum, odio libero ultricies orci, sed
            efficitur tortor orci in ligula. Aenean tincidunt aliquet massa ut
            faucibus. Donec hendrerit eu diam eu congue. Vestibulum rutrum
            aliquam neque, id feugiat quam interdum non. Nullam vel mauris semper
            diam molestie vulputate. Sed tempor, tortor et efficitur dapibus,
            erat nisl dignissim mi, non dignissim justo nisl vel nisi. Praesent
            quis porttitor ante. Phasellus vel neque ut dui fringilla laoreet
            vel nec erat. Duis quis lorem posuere, egestas risus sit amet,
            ultricies eros.
          </Text>
        </Container>
      </div>
    );
  }
}

export default PersecutedChurch;
