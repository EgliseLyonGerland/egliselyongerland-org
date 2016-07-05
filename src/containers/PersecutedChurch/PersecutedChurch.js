import React, { Component } from 'react';

import { asyncConnect } from 'redux-async-connect';
import { Parallax } from 'react-parallax';
import Helmet from 'react-helmet';

import { Container, Text, Hr } from 'components';

@asyncConnect([{
  deferred: true,
  promise: () => Promise.all([]),
}])
export default
class PersecutedChurch extends Component {

  render() {
    const picture = require('./picture.jpg');
    const picture2 = require('./picture2.jpg');

    return (
      <div>
        <Helmet title="L'Église persécutée" />

        <Parallax bgImage={picture} strength={400}>
          <div style={{ height: '800px' }} />
        </Parallax>

        <Hr xl />

        <Container sm style={{ height: '100vh' }}>
          <Text fontSize={2} fontWeight="bold" element="h2">Lorem ipsum</Text>
          <Hr lg />
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget eros vitae dolor tempus fringilla. Nullam vel tempus mi, nec aliquet tortor. Duis pulvinar ante quis lorem tincidunt, dapibus dignissim libero consectetur. Donec in ligula dapibus, lacinia nisl sit amet, condimentum quam. Morbi luctus risus nisl, quis dictum enim pretium id. In iaculis rutrum justo. Suspendisse posuere molestie dictum. In porttitor felis vitae tortor rutrum, ac porttitor leo euismod. Fusce sit amet ante felis. Morbi purus urna, interdum vel auctor a, posuere ac tellus. Vivamus cursus imperdiet fermentum.
          </Text>
          <Hr />
          <Text>
            Nam commodo luctus scelerisque. Vivamus posuere velit odio, ut condimentum sapien viverra eget. Integer sit amet augue at leo pellentesque viverra. Nullam finibus nulla neque, vitae maximus mi mattis ut. Nunc mauris eros, tempor ut dictum id, lacinia eu sapien. Cras convallis sem gravida, sollicitudin augue consectetur, viverra ipsum. Integer facilisis ac est ornare convallis. Mauris tincidunt finibus urna eget varius. Donec id metus a massa elementum pulvinar sed ut lorem. Nullam mollis urna justo, a consequat nulla gravida dictum. Etiam pellentesque lectus lorem, vitae efficitur arcu ultricies sed. Maecenas non dapibus sem. Nulla eu odio vel metus pulvinar ornare dapibus id purus.
          </Text>
        </Container>

        <Hr xl />

        <Parallax bgImage={picture2} strength={400}>
          <div style={{ height: '800px' }} />
        </Parallax>
      </div>
    );
  }
}
