import React, { Component } from "react";
import { disableButton, enableButton } from "../../Helper/buttonToggle";
import { connect } from "react-redux";
import { errorMessage, success } from "../../Helper/Message";
import { Link } from "react-router-dom";
import { updateVideos } from "../../store/action";
import { database } from "../../Helper/Firebase";
import FormField from "../FormField/FormField";
import { getTextValue } from "../../Helper/getValue";
import { Modal } from "antd";
import Portfolio from "./Portfolio";
import UserIntro from "./UserIntro";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
class UserInfo extends Component {
  state = {
    userObj: {},
    visible: false,
    loading: false,
    videos: []
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.props.updateVideos();
    const componentThis = this;
    let userObj = {};
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    let userId = window.location.pathname.split("/")[3];
    database
      .ref(`/users/${userId}`)
      .once("value")
      .then(snap => {
        userObj = snap.val();
        componentThis.setState(
          {
            userObj: {
              ...userObj,
              followers: JSON.parse(userObj.followers)
            },
            loading: false
          },
          () => {
            let alredyFollowing = false;
            componentThis.state.userObj.followers.map(userId => {
              if (userId === this.props.user.userId) {
                alredyFollowing = true;
              }
              return userId;
            });
            if (alredyFollowing) {
              disableButton("followBtn");
            }
          }
        );
      });
  }
  addFollowing = () => {
    if (!this.props.auth || this.props.admin) {
      return errorMessage("Login First");
    } else if (this.props.user.lock) {
      return errorMessage("Sorry Need A Approved Video");
    }
    // disableButton("followBtn");
    let followerUserId = this.props.user.userId;
    let followedUserId = this.state.userObj.userId;
    if (followedUserId === followerUserId) {
      return errorMessage("Can not Follow Self");
    }
    this.getFollowingDB(followedUserId, followerUserId);
  };
  getFollowingDB = (followedUserId, followerUserId) => {
    let userFollowerArr = [],
      dublicate = false;
    database
      .ref(`users/${followedUserId}`)
      .once("value")
      .then(userSnapshot => {
        let userObj = userSnapshot.val();
        userFollowerArr = JSON.parse(userObj.followers);
        userFollowerArr.map(userId => {
          if (userId === followerUserId) {
            dublicate = true;
          }
          return userId;
        });
        if (dublicate) {
          return errorMessage("Already Following");
        }
        userFollowerArr.push(followerUserId);
        this.setFollowingDB(followedUserId, userFollowerArr);
      });
  };
  setFollowingDB = (followedUserId, userFollowerArr) => {
    database
      .ref(`users/${followedUserId}`)
      .update({
        followers: JSON.stringify(userFollowerArr)
      })
      .then(() => {
        success("Following Successfully");
      })
      .catch(err => {
        errorMessage(err.message);
      });
  };
  onSumbitMessageForm = e => {
    e.preventDefault();
    if (!this.props.auth || this.props.admin) {
      return errorMessage("Sorry You Can Not Send Message");
    } else if (this.props.user.userId === this.state.userObj.userId) {
      return errorMessage("Can not send message to self");
    } else if (this.props.user.lock) {
      return errorMessage("Sorry Need A Approved Video");
    }
    const userMessage = getTextValue("messageContent");
    let messageArr = JSON.parse(this.state.userObj.messages);
    messageArr.push({
      replied: false,
      userId: this.props.user.userId,
      userName: this.props.user.name,
      userMessage
    });
    return this.sendMessage(messageArr);
  };
  sendMessage = messageArr => {
    database
      .ref(`users/${this.state.userObj.userId}`)
      .update({
        newMessage: true,
        messages: JSON.stringify(messageArr)
      })
      .then(() => {
        const componentThis = this;
        componentThis.setState(prevState => ({
          ...prevState,
          visible: false
        }));
        enableButton("followBtn");
        success("Message Send Successfully");
      });
  };
  render() {
    return (
      
      <div
      style={{
        
        paddingTop: 10,
        paddingBottom: 40,
        paddingLeft: 60,
        paddingRight: 40
      }}
    > 
      <UserIntro></UserIntro>
      
      <Portfolio />
      
    </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateVideos: () => dispatch(updateVideos())
});

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    auth: state.auth,
    admin: state.admin,
    videos: state.videos
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
