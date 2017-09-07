import React, { Component } from "react";

import { Link } from "react-router";

import { Image, Button, Text, H2, Hr } from "components";
import routes from "utils/routes";

import styles from "./WhatWhenWhere.scss";

class WhatWhenWhere extends Component {
  render() {
    return (
      <div className={styles.www}>
        <div className={styles.right}>
          <H2>
            Culte ouvert à tous,<br /> le dimanche à 17h.
          </H2>
          <Text>302 avenue Jean Jaurès</Text>
          <Text>69007 Lyon</Text>
          <Hr lg />
          <Link to={routes.worship()}>
            <Button>En savoir plus</Button>
          </Link>
          <Hr inline />
          <Link to={routes.contact()}>
            <Button>Contact</Button>
          </Link>
        </div>
        <div className={styles.left}>
          <Image src="/images/map.png" height={450} />
        </div>
      </div>
    );
  }
}

export default WhatWhenWhere;
