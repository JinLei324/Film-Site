import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import filmLyfeLogo from "../../images/logo.svg";

class FooterComponent extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#333331" }}>
        <Container
          style={{
            paddingTop: 30,
            paddingBottom: 30,
            paddingRight: 70,
            paddingLeft: 70
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            <div style={{ flex: 1, padding: 20 }}>
              <img
                src={filmLyfeLogo}
                alt="FilmLyfe Logo"
                id="footer_logo_img"
              />
              <h2 style={{ color: "white" }}>FilmLyfe</h2>
              <p style={{ color: "white" }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
                dolorum voluptate eos rem
              </p>
            </div>
            <div style={{ flex: 2, padding: 20 }}>
              <Link to="/">
                <h3 style={{ color: "white" }}>Home page</h3>
              </Link>
              <Link to="/category">
                <h3 style={{ color: "white" }}>Categories</h3>
              </Link>
              <Link to="/contact">
                <h3 style={{ color: "white" }}>Contact Us</h3>
              </Link>
              <Link to="/upload">
                <h3 style={{ color: "white" }}>Submit Film</h3>
              </Link>
              <Link to="/">
                <h3 style={{ color: "white" }}>Terms</h3>
              </Link>
            </div>
            <div style={{ padding: 20, textAlign: "center" }}>
              <div>
                <Link to="/" className="leftOrient">
                  <i className="fa fa-facebook" />
                </Link>
                <Link
                  to="/"
                  style={{ marginLeft: 12 }}
                  aria-label="Facebook"
                  className="leftOrient"
                >
                  <i className="fa fa-twitter" />
                </Link>
                <Link
                  to="/"
                  style={{ marginLeft: 12 }}
                  aria-label="Instagram"
                  className="leftOrient"
                >
                  <i className="fa fa-instagram" />
                </Link>
                <Link
                  to="/"
                  style={{ marginLeft: 12 }}
                  aria-label="Youtube"
                  className="leftOrient"
                >
                  <i className="fa fa-youtube" />
                </Link>
              </div>
              <Button
                variant="contained"
                color="primary"
                id="footer_contact_us_btn"
                style={{ borderRadius: 30, marginTop: 10 }}
              >
                Contact US
              </Button>
            </div>
          </div>

          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <div style={{ textAlign: "center", color: "white" }}>
            C 2019, All Rights Reserved. FilmLyfe
          </div>
        </Container>
      </div>
    );
  }
}

export default FooterComponent;
