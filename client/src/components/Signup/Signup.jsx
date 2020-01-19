import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormField from "../FormField/FormField";
import uuid from "uuid";
import { database } from "../../Helper/Firebase";
import { success, errorMessage } from "../../Helper/Message";
import { enableButton } from "../../Helper/buttonToggle";
import { getTextValue } from "../../Helper/getValue";
import { setAuth } from "../../store/action";
import { connect } from "react-redux";
import { getAllUsersEmail } from "../../Helper/user";
import _ from "lodash";
import Comfort from "../../assets/sign_up_comfort.svg";
import Comfort2 from "../../assets/sign_up_comfort2.svg";
import Comfort3 from "../../assets/sign_up_comfort3.svg";
import VideoPoster from "../../assets/VideoPlay/images/video.png";
import customAxios from '../../Helper/customAxios.js';
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

class Signup extends Component {
  state = {
    users: [],
    loading: false
  };
  stateLoading = valu => {
    this.setState(prevState => ({
      ...prevState,
      loading: valu
    }));
  };
  componentDidMount() {
    getAllUsersEmail().then(users => {
      this.setState({
        users
      });
    });
  }
  onSubmit = e => {
    e.preventDefault();
    this.stateLoading(true);
    const componentThis = this;
    const name = getTextValue("userName");
    const email = getTextValue("userEmail");
    let password = getTextValue("userPassword");
    // password = bcrypt.hashSync(password, salt);
    const userDescription = getTextValue("userDescription");
    const userTitle = getTextValue("userTitle");
    const userId = uuid();
    const allowed = false;
    const lock = true;
    const followers = JSON.stringify([]);
    const messages = JSON.stringify([]);
    const notifications = JSON.stringify([]);
    const newNotification = false;
    const newMessage = false;

    console.log(name,email,password,userId);

    let objReq={'name':name,'email':email,'password':password,'userDescription':userDescription,'userTitle':userTitle,'userId':userId};

    customAxios.post(`/signup`, objReq)
    .then(res => {
      console.log(res);
           success("Request Is Pending From Admin To Approve");
        componentThis.stateLoading(false);
        this.props.history.push("/");
    }).catch(function (err) {
       componentThis.stateLoading(false);
          enableButton("signupBtn");
         errorMessage(err.message);
        console.log(err.message);
    });

    
  };
  render() {
    return (
      <div className="mainSignup mainDiv">
        <h1 id="signup_feature_title">Features</h1>
        <span id="signup_feature_title_desc">
          Excepteur sint occaecat cupidatat non proident.
        </span>
        <div id="featured_container">
          <div className="features_div">
            <img src={Comfort} alt="" className="features_div_img" />
            <span className="features_div_heading">Comfortable place</span>
            <span className="features_div_des">
              Designers, download the design stuff for free — icons, photos, UX
              illustrations.
            </span>
          </div>
          <div className="features_div">
            <img src={Comfort2} alt="" className="features_div_img" />
            <span className="features_div_heading">Comfortable place</span>
            <span className="features_div_des">
              Designers, download the design stuff for free — icons, photos, UX
              illustrations.
            </span>
          </div>
          <div className="features_div">
            <img src={Comfort3} alt="" className="features_div_img" />
            <span className="features_div_heading">Comfortable place</span>
            <span className="features_div_des">
              Designers, download the design stuff for free — icons, photos, UX
              illustrations.
            </span>
          </div>
        </div>
        <div id="signup_video_container">
          <div
            className="signup_video_container_div"
            id="signup_video_container_div-video"
          >
            <video poster={VideoPoster} />
          </div>
          <div
            className="signup_video_container_div"
            id="signup_video_container_div-text"
          >
            <span id="signup_video_container_div-text_heading">
              How it works
            </span>
            <span id="signup_video_container_div-text_desc">
              <span>
                Norway is home to some of the most spectacular fjords on Earth.
                <br />
              </span>
              <span>
                These v-shaped valleys carved by glaciers during the last ice
                age harbor sharp mountain ridges and long arms of sea water
                turning.
                <br />
              </span>
              <span>
                Kath Holden is an artist of the everyday. Inspired by the world
                around her, Kath's creations are whimsical yet keenly observed.
              </span>
            </span>
          </div>
        </div>
        <div id="sign_up_form_container">
          <div id="sign_up_form_container-text">
            <span id="sign_up_form_container-text-heading">Sign Up</span>
            <span id="sign_up_form_container-text-desc">
              Excepteur sint occaecat cupidatat non proident.
            </span>
          </div>
          <div id="sign_up_form_container-form_field">
            <div id="sign_up_form_container-form_field_input">
              <label htmlFor="">
                <span className="labelText_form_input">Your Name</span>
                <input
                  type="text"
                  name=""
                  id="userName"
                  placeholder="Enter Your Name"
                />
              </label>
              <br />
              <label htmlFor="">
                <span className="labelText_form_input">Your Title</span>
                <input
                  type="text"
                  name=""
                  id="userTitle"
                  placeholder="Choose you title"
                />
              </label>
              <br />
              <label htmlFor="">
                <span className="labelText_form_input">E-mail</span>
                <input
                  type="text"
                  name=""
                  id="userEmail"
                  placeholder="Enter your Email"
                />
              </label>

              <label htmlFor="">
                <span className="labelText_form_input">Password</span>
                <input
                  type="password"
                  name=""
                  id="userPassword"
                  placeholder="Enter Password"
                />
              </label>

            </div>
            <div id="sign_up_form_container-form_field_text_area">
              <textarea id="userDescription" placeholder="Tell Us About You" />
            </div>
          </div>
          <button id="form_submit_sig_up_btn" onClick={this.onSubmit}>
            Sign Up
          </button>
        </div>
        {/* <form onSubmit={this.onSubmit}>
          <FormField
            type="text"
            name="userName"
            id="userName"
            title="Name"
            required={true}
          />
          <FormField
            type="email"
            name="userEmail"
            id="userEmail"
            title="Email"
            required={true}
          />
          <FormField
            type="password"
            name="userPassword"
            id="userPassword"
            title="Password"
            required={true}
          />

          <FormField
            type="userTitle"
            name="userTitle"
            id="userTitle"
            title="Title"
            required={true}
            className="signUpUserTitle"
          />
          <FormField
            type="description"
            name="userDescription"
            id="userDescription"
            title="Who Are You"
            required={true}
            placeholder="Summary Of Who You Are"
          />
          <button className="btn" id="signupBtn" type="submit">
            {this.state.loading ? (
              <span>
                <i class="fa fa-circle-o-notch fa-spin" />
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </form> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAuth: user => dispatch(setAuth(user))
});

export default connect(
  null,
  mapDispatchToProps
)(Signup);
