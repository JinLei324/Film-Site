import React, { Component } from "react";
import { Link } from "react-router-dom";
import { success, errorMessage } from "../../Helper/Message";
import FormField from "../FormField/FormField";
import { database } from "../../Helper/Firebase";
import { Modal } from "antd";
import { getAllPendingUsers } from "../../Helper/user";
import _ from "lodash";
import axios from "axios";
import { getTextValue } from "../../Helper/getValue";

class AccountRequest extends Component {
  state = {
    users: [],
    visible: false,
    loading: false,
    userObj: {}
  };
  onSumbitMessageForm = e => {
    e.preventDefault();
    const email = this.state.userObj.email;
    const name = this.state.userObj.name;
    const message = getTextValue("messageContent");
    const componentThis = this;
    this.setState({
      loading: true
    });
    axios
      .post("/sendEmail", {
        email,
        message,
        name
      })
      .then(function(response) {
        success("Send Successfully");
        componentThis.setState(prevState => ({
          ...prevState,
          loading: false,
          visible: false
        }));
      })
      .catch(function(error) {
        componentThis.setState(prevState => ({
          ...prevState,
          loading: false
        }));
        errorMessage("Server Error");
        console.log(error);
      });
  };
  showModal = userObj => {
    this.setState({
      visible: true,
      userObj
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };
  removeUserState = id => {
    const componentThis = this;
    let users = componentThis.state.users;
    let usersUpdated = _.remove(users, function(user) {
      return user.userId !== id;
    });
    componentThis.setState({
      users: usersUpdated
    });
  };
  showConfirmRemove(id) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want to Remove This User?",
      onOk() {
        componentThis.removeUserState(id);
        database
          .ref(`users/${id}`)
          .remove()
          .then(() => {
            success("User Removed Successfully");
          })
          .catch(err => {
            errorMessage(err.message);
          });
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  showConfirmApprove(id) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want to Approve This User?",
      onOk() {
        componentThis.removeUserState(id);
        database
          .ref(`users/${id}`)
          .update({
            allowed: true
          })
          .then(() => {
            success("User Approved Successfully");
          })
          .catch(err => {
            errorMessage(err.message);
          });
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  componentDidMount() {
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    getAllPendingUsers().then(users => {
      this.setState(prevState => ({
        ...prevState,
        users,
        loading: false
      }));
    });
  }
  render() {
    return (
      <div className="mainAccountRequest mainDiv">
        <h1>AccountRequests</h1>
        <Link to="/admin">
          <button className="btn">Admin</button>
        </Link>
        <br />
        {!this.state.loading && (
          <div className="userAccountCard">
            {this.state.users.length !== 0
              ? this.state.users.map((user, i) => {
                  if (user.allowed) {
                    return user;
                  }
                  return (
                    <div className="userAccountCard_member" key={i}>
                      <h2>Title</h2>
                      <span>{user.userTitle}</span>
                      <h2>Name</h2>
                      <span>{user.name}</span>
                      <h2>Email</h2>
                      <span>{user.email}</span>
                      <h2>Description</h2>
                      <span>{user.userDescription}</span>
                      <div className="userAccountCard_btnGroup">
                        <button
                          className="btn cardBtn"
                          onClick={() => this.showConfirmApprove(user.userId)}
                        >
                          {" "}
                          Approve
                        </button>
                        <button
                          className="btn cardBtn"
                          onClick={() => this.showConfirmRemove(user.userId)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn cardBtn"
                          onClick={() => this.showModal(user)}
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  );
                })
              : "No Account Request Is Pending"}
          </div>
        )}
        {this.state.loading && <i className="fa fa-circle-o-notch fa-spin" />}
        <Modal
          title={`Send Email`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <form onSubmit={this.onSumbitMessageForm} className="modalForm">
            <FormField
              type="description"
              name="messageContent"
              id="messageContent"
              title="Write Email"
              required={true}
              placeholder="Start Writing Email"
            />
            <button className="btn modalFormBtn" type="submit">
              {this.state.loading ? (
                <span>
                  <i className="fa fa-circle-o-notch fa-spin" />
                </span>
              ) : (
                "Send Email"
              )}
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default AccountRequest;
