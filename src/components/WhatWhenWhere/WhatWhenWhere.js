import React from "react";
import { withStyles } from "material-ui";

import { Link } from "react-router";

import { Image, Text, H2, Hr } from "components";
import Button from "components/Button/Button";
import routes from "utils/routes";

const styles = {
  www: {
    background: "#eee",
    display: "flex",
    alignItems: "center"
  },
  right: {
    width: 450,
    padding: 30
  },
  left: {
    flexGrow: 1
  }
};

const WhatWhenWhere = ({ classes }) => (
  <div className={classes.www}>
    <div className={classes.right}>
      <H2>
        Culte ouvert à tous,<br /> le dimanche à 17h.
      </H2>
      <Text>302 avenue Jean Jaurès</Text>
      <Text>69007 Lyon</Text>
      <Hr lg />
      <Link to={routes.worship()}>
        <Button bordered>En savoir plus</Button>
      </Link>
      <Hr inline />
      <Link to={routes.contact()}>
        <Button bordered>Contact</Button>
      </Link>
    </div>
    <div className={classes.left}>
      <Image src="/images/map.png" height={450} />
    </div>
  </div>
);

export default withStyles(styles)(WhatWhenWhere);
