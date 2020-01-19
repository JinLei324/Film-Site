import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import GOOGLE from "../../assets/google.png";
import FACEBOOK from "../../assets/facebook.png";
import YOUTUBE from "../../assets/youtube.png";
import TWITTER from "../../assets/twitter.png";
import { Link } from "react-router-dom";
import "./ContactUs.css";
import { success, errorMessage } from "../../Helper/Message";
import { disableButton, enableButton } from "../../Helper/buttonToggle";
import axios from "axios";
import { getTextValue } from "../../Helper/getValue";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  videosContainer: {
    // backgroundColor: 'green',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 0
  },
  item: {
    maxWidth: 360,
    margin: 15
  },
  filter: {
    color: "#00AEEF",
    fontWeight: "bold",
    textAlign: "center"
  },
  sortby: {
    color: "black",
    textAlign: "center"
  },
  info: {
    height: 134,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e6e6e6"
  },
  icons: {
    height: 40,
    width: 40,
    color: "white",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    border: "none",
    backgroundColor: "#e6e6e6",
    paddingLeft: 18,
    paddingTop: 8,
    paddingBottom: 8,
    width: "80%",
    borderRadius: 20
  },
  inputArea: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    border: "none",
    backgroundColor: "#e6e6e6",
    paddingLeft: 18,
    paddingTop: 8,
    paddingBottom: 8,
    height: 200,
    width: "100%",
    borderRadius: 20,
    resize: "none"
  }
}));

export default function ContactUs() {
  const classes = useStyles();
  let onSubmit = e => {
    const name = getTextValue("userName");
    const email = getTextValue("userEmail");
    const message = getTextValue("userMessage");
    disableButton("signinBtn");
    axios
      .post("/contact", {
        name,
        email,
        message
      })
      .then(function(response) {
        success("Send Successfully");
      })
      .catch(function(error) {
        errorMessage("Server Error");
        enableButton("signinBtn");
        console.log(error);
      });
  };
  return (
    <div className={classes.root} id="man_contact_us_div">
      <Container>
        <Grid container style={{ marginBottom: 60, marginTop: 60 }}>
          <Grid item xs={12} className={classes.filter}>
            <Typography
              style={{
                fontFamily: "Poppins",
                fontSize: 40,
                fontWeight: "bold",
                letterSpacing: "0.03em"
              }}
            >
              Our Contacts
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.sortby}>
            <Typography style={{ fontFamily: "Poppins", fontSize: 18 }}>
              Excepteur sint occaecat cupidatat non proident,
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.sortby}>
            <Typography style={{ fontFamily: "Poppins", fontSize: 18 }}>
              sunt in culpa qui officia.
            </Typography>
          </Grid>
        </Grid>

        <Grid container style={{ marginBottom: 100, marginTop: 100 }}>
          <Grid item xs={12} sm={6} md={4} className={classes.info}>
            <Grid container style={{ marginTop: 37, alignItems: "center" }}>
              <Grid
                item
                xs={6}
                md={3}
                sm={4}
                align="center"
                className="contactinfo"
              >
                <Phone color="primary" />
              </Grid>
              <Grid item xs={6} md={9} sm={8}>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    textAlign: "left"
                  }}
                >
                  +44 345 678 903 <br /> +44 345 678 903
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.info}>
            <Grid container style={{ marginTop: 45, alignItems: "center" }}>
              <Grid item xs={6} md={3} sm={4} align="center">
                <Email color="primary" />
              </Grid>
              <Grid item xs={6} md={9} sm={8}>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    textAlign: "left"
                  }}
                >
                  adobexd@mail.com
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} className={classes.info}>
            <Grid container style={{ marginTop: 32, alignItems: "center" }}>
              <Grid item xs={6} md={3} sm={4} align="center">
                <LocationOn color="primary" />
              </Grid>
              <Grid item xs={6} md={9} sm={8}>
                <Typography
                  style={{
                    fontFamily: "Poppins",
                    fontSize: 16,
                    textAlign: "left"
                  }}
                >
                  497 Evergreen Rd. <br /> Roseville, CA <br /> 95673
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container style={{ marginBottom: 60, marginTop: 60 }}>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            style={{ textAlign: "left" }}
            className="writeus"
          >
            <Typography
              style={{
                color: "#333331",
                marginBottom: 20,
                fontFamily: "Poppins",
                fontSize: 36,
                fontWeight: "bold"
              }}
            >
              Write Us
            </Typography>
            <Typography
              style={{
                fontFamily: "Poppins",
                marginBottom: 20,
                fontSize: 14,
                fontWeight: "normal"
              }}
            >
              Valleys carved by glaciers during <br />
              the last ice age harbor sharp <br />
              mountain ridges and long arms of <br />
              sea sharp mountain ridges and long <br />
              arms of sea arms.
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Link to="/">
                  <img src={GOOGLE} className={classes.icons} />
                </Link>
                <Link to="/">
                  <img src={FACEBOOK} className={classes.icons} />
                </Link>
                <Link to="/">
                  <img src={YOUTUBE} className={classes.icons} />
                </Link>
                <Link to="/">
                  <img src={TWITTER} className={classes.icons} />
                </Link>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} md={4} style={{ textAlign: "left" }}>
            <Typography
              style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}
            >
              YOUR NAME
            </Typography>
            <input
              placeholder="Enter your name"
              id="userName"
              className={classes.input}
            />
            <Typography
              style={{
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 8,
                marginTop: 36
              }}
            >
              YOUR E-MAIL
            </Typography>
            <input
              placeholder="Enter your E-mail"
              id="userEmail"
              className={classes.input}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <div style={{ textAlign: "left" }}>
              <Typography
                style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}
              >
                MESSAGE
              </Typography>
            </div>
            <div style={{ textAlign: "left" }}>
              <textarea
                className={classes.inputArea}
                rows="4"
                cols="36"
                id="userMessage"
                placeholder="Enter your message"
              />
            </div>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                id="contact_us_btn"
                onClick={onSubmit}
                style={{ borderRadius: 30, marginTop: 10 }}
              >
                Send
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
