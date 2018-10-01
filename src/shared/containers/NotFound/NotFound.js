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
        <Container style={{ textAlign: 'center' }} sm>
          <Text color="white" fontSize={2} fontWeight="medium">
            {book}
          </Text>
          <Text color="white" fontSize={10} fontWeight="bold" lineHeight={10}>
            40.4
          </Text>
          <Hr width="50%" line xl />
          <Text
            color="white"
            element="div"
            fontSize={1.6}
            fontWeight="light"
            italic
          >
            “{verse}”
            <Text fontSize={1.6} fontWeight="regular">
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
