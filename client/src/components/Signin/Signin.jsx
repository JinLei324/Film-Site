import React, { Component } from "react";
import { Link } from "react-router-dom";
import { database } from "../../Helper/Firebase";
import FormField from "../FormField/FormField";
import { success, errorMessage } from "../../Helper/Message";
import { disableButton, enableButton } from "../../Helper/buttonToggle";
import { getTextValue } from "../../Helper/getValue";
import { setAuth, setAdmin } from "../../store/action";
import { connect } from "react-redux";
import { Checkbox, message } from "antd";
import customAxios from '../../Helper/customAxios.js';

var bcrypt = require("bcryptjs");


class Signin extends Component {
  state = {
    admin: false,
    loading: false,
    checked: false
  };
  stateLoading = valu => {
    this.setState(prevState => ({
      ...prevState,
      loading: valu
    }));
  };
  
  onSubmit = e => {
    e.preventDefault();
    this.stateLoading(true);
    const componentThis = this;
    const email = getTextValue("userEmail");
    const password = getTextValue("userPassword");
    let users = [],
      found = false,
      allowed = false,
      userFound = {};
    disableButton("signinBtn");
    if (email === "admin" && password === "admin") {
      success("Hello Admin");
      if (this.state.checked) {
        localStorage.setItem(
          "7Yg83Jh",
          JSON.stringify({ url: "asdhg&dAaagjsdg&^&*#987*&#*(*@6" })
        );
      }
      this.props.setAdmin();
      return this.props.history.push("/admin");
    }
let objreq={'userEmail':email,'userPassword':password};

    customAxios.post('/signIn',objreq).then(res => {
      console.log(res);
           
      success("Login Successfully");
            componentThis.props.history.push("/");
    }).catch(function (err) {
    
      errorMessage(err.response.data.response.message);
            componentThis.stateLoading(false);
            enableButton("signinBtn");
        console.log('UUUUUUUUU***',err.response.data.response.message);
    });

    // database
    //   .ref("users")
    //   .once("value")
    //   .then(snapshot => {
    //     snapshot.forEach(childSnapshot => {
    //       var user = childSnapshot.val();
    //       users.push(user);
    //     });

    //     users.forEach(user => {
    //       if (
    //         user.email === email &&
    //         bcrypt.compareSync(password, user.password)
    //       ) {
    //         found = true;
    //         if (user.allowed) {
    //           allowed = true;
    //           userFound = user;
    //         }
    //       }
    //       return;
    //     });
    //     if (found && allowed) {
    //       componentThis.props.setAuth(userFound);
    //       if (this.state.checked) {
    //         localStorage.setItem("userObjLogin", JSON.stringify(userFound));
    //       }
    //       found = false;
    //       allowed = false;
    //       success("Login Successfully");
    //       componentThis.props.history.push("/");
    //     } else if (found && !allowed) {
    //       errorMessage("Account Is Pending");
    //       componentThis.stateLoading(false);
    //       enableButton("signinBtn");
    //     } else {
    //       errorMessage("Sorry Incorrect Data");
    //       componentThis.stateLoading(false);
    //       enableButton("signinBtn");
    //     }
    //   })
    //   .catch(err => {
    //     errorMessage(err.message);
    //     console.log(err);
    //   });
  };
  changeAdmin = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        admin: !prevState.admin
      };
    });
  };
  onChangeCheckBox = e => {
    this.setState(prevState => {
      return {
        ...prevState,
        checked: e.target.checked
      };
    });
  };
  render() {

    return (
      <div className="mainSignin mainDiv">
        <h1>
          Wellcome Back <span>{this.state.admin ? "Admin" : "User"}</span>
        </h1>
        <Link to="/">Home</Link>
        <form onSubmit={this.onSubmit}>
          <FormField
            type={this.state.admin ? "text" : "email"}
            name="userEmail"
            id="userEmail"
            title={this.state.admin ? "Name" : "Email"}
            required={true}
          />
          <FormField
            type="password"
            name="userPassword"
            id="userPassword"
            title="Password"
            required={true}
          />
          <Checkbox onChange={this.onChangeCheckBox}>
            Keep Me Logged In
          </Checkbox>
          <br />
          <button className="btn" id="signinBtn" type="submit">
            {this.state.loading ? (
              <span>
                <i className="fa fa-circle-o-notch fa-spin" />
              </span>
            ) : (
              "Submit"
            )}
          </button>
          <Link to="/signup">
            <button className="btn">Signup</button>
          </Link>
          <button className="btn" id="signinBtn" onClick={this.changeAdmin}>
            <span>{this.state.admin ? "User" : "Admin"}</span> Login
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setAuth: user => dispatch(setAuth(user)),
  setAdmin: _ => dispatch(setAdmin())
});

export default connect(
  null,
  mapDispatchToProps
)(Signin);
