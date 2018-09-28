import React from 'react';
import { keys } from 'lodash';
import moment from 'moment';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';
import Status from 'components/Status/Status';

import verses from './verses.json';

const NotFound = () => {
  const books = keys(verses);
  const index = parseInt(moment().format('DDD'), 10) % books.length;
  const book = books[index];
  const verse = verses[book];

  return (
    <Status code={404}>
      <Jumbotron>
        <Container sm style={{ textAlign: 'center' }}>
          <Text color="white" fontWeight="medium" fontSize={2}>
            {book}
          </Text>
          <Text color="white" fontSize={10} lineHeight={10} fontWeight="bold">
            40.4
          </Text>
          <Hr line width="50%" xl />
          <Text
            element="div"
            color="white"
            fontWeight="light"
            fontSize={1.6}
            italic
          >
            “{verse}”
            <Text fontWeight="regular" fontSize={1.6}>
              — {book} 40.4
              {book} 40.4
              {book} 40.4
              {book} 40.4
              {book} 40.4
            </Text>
          </Text>
        </Container>
      </Jumbotron>
    </Status>
  );
};

export default NotFound;
