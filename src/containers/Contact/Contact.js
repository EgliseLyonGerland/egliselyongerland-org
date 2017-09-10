import React, { Component } from "react";
import Helmet from "react-helmet";

import { Container, Jumbotron, Button, Text, Hr } from "components";

import picture from "./jumbotron.jpg";

import theme from "config/theme";

class Contact extends Component {
  constructor() {
    super();

    this.state = {
      showForm: false
    };
  }

  handleSendMessageButton() {
    console.log("toto");
    this.setState({ showForm: true });
  }

  renderTitle(title) {
    return (
      <Text
        element="h2"
        fontSize={2.2}
        fontWeight="regular"
        color={theme.palette.primary[500]}
      >
        {title}
      </Text>
    );
  }

  render() {
    const { showForm } = this.state;

    return (
      <div>
        <Helmet>
          <title>Contact</title>
        </Helmet>

        <Jumbotron title="Contact" background={picture} />
        <Hr lg />

        <Container>
          <div className="row">
            <div className="col-sm-5 col-md-6">
              {this.renderTitle("Info")}
              <Hr />

              <Text fontSize={1.6}>
                <b>Église Lyon Gerland</b>
              </Text>
              <Text color="#777">Réformée, Évangélique</Text>
              <Hr />
              <Text>302 avenue Jean Jaurès</Text>
              <Text>69007 Lyon</Text>
              <Hr />
              <Text>
                <b>Métro :</b> Stade de Gerland
              </Text>
              <Hr lg />
              <Text fontSize={1.2}>
                <b>Téléphone:</b> (+33) 06.79.27.38.65
              </Text>
              <Text fontSize={1.2}>
                <b>Email:</b>{" "}
                <a href="mailto:contact@egliselyongerland.org">
                  contact@egliselyongerland.org
                </a>
              </Text>

              <Hr xl />
            </div>
            <div className="col-sm-7 col-md-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.120360872194!2d4.8296063158166875!3d45.72868097910506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47f4ea28fb13f6bf%3A0x23df16c38cf568e9!2zw4lnbGlzZSBMeW9uIEdlcmxhbmQgKFLDqWZvcm3DqWUgw4l2YW5nw6lsaXF1ZSk!5e0!3m2!1sfr!2sfr!4v1505047371132"
                width="100%"
                height="450"
                frameBorder="0"
                style={{ border: 0, width: "100%", height: 450 }}
                allowFullScreen
              />

              <Hr xl />
            </div>
          </div>
        </Container>

        {/* <Container>
          {this.renderTitle("Envoyer un message")}

          <div style={{ maxWidth: 500, height: 330, overflow: "hidden" }}>
            <iframe
              src="https://egliselyongerland.typeform.com/to/FmhETZ"
              style={{ width: "100%", height: 400, border: 0 }}
              scrolling="no"
            />
          </div>
        </Container> */}

        {/* <Hr xl /> */}

        {showForm && <ContactForm />}
      </div>
    );
  }
}

export default Contact;
