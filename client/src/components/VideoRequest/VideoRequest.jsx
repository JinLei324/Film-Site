import React, { Component } from "react";
import { Link } from "react-router-dom";
import { success, errorMessage } from "../../Helper/Message";
import { connect } from "react-redux";
import FormField from "../FormField/FormField";
import axios from "axios";
import { updateVideos } from "../../store/action";
import { database, storage } from "../../Helper/Firebase";
import { sendNotifications } from "../../Helper/user";
import { Modal } from "antd";
import _ from "lodash";
import { getTextValue } from "../../Helper/getValue";

class VideoRequest extends Component {
  state = {
    videos: [],
    visible: false,
    loading: false,
    currentVideo: {},
    userObj: {}
  };
  showModal = currentVideo => {
    this.setState(prevState => ({
      ...prevState,
      visible: true,
      currentVideo
    }));
  };
  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  removeVideoState = id => {
    const componentThis = this;
    let videos = componentThis.state.videos;
    let videosUpdated = _.remove(videos, function(video) {
      return video.videoId !== id;
    });
    componentThis.setState({
      videos: videosUpdated
    });
    this.props.updateVideos();
  };
  onSumbitMessageForm = e => {
    e.preventDefault();
    const email = this.state.currentVideo.user.email;
    const name = this.state.currentVideo.user.name;
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
  showConfirmRemove(dbId, storageId) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Remove This Vide?",
      onOk() {
        componentThis.removeVideoState(dbId);
        database
          .ref(`videos/${dbId}`)
          .remove()
          .then(() => {
            return storage.ref(storageId).delete();
          })
          .then(() => {
            success("video Removed Successfully");
          })
          .catch(err => {
            console.log(err);
            errorMessage(err.message);
          });
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  showConfirmApprove(videoId, userId, userObj) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Are You Sure ?",
      onOk() {
        componentThis.removeVideoState(videoId);
        database
          .ref(`videos/${videoId}`)
          .update({
            allowed: true,
            disabled: false,
            hide: false
          })
          .then(() => {
            return database.ref(`users/${userId}`).update({
              lock: false
            });
          })
          .then(() => {
            sendNotifications(userObj);
            success("Operation Successful");
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
    let users = [];
    let videos = this.props.videos;
    database
      .ref("users")
      .once("value")
      .then(snapshot => {
        snapshot.forEach(function(childSnapshot) {
          var user = childSnapshot.val();
          users.push(user);
        });
        videos = _.remove(videos, function(video) {
          return video.allowed === false || video.disabled === true;
        });
        videos = videos.map(video => {
          let user = _.findIndex(users, function(user) {
            return user.userId === video.userId;
          });
          if (user !== -1) {
            return {
              ...video,
              user: users[user]
            };
          } else {
            return {
              ...video,
              user: users[0]
            };
          }
        });
        this.setState(prevState => ({
          ...prevState,
          loading: false,
          videos: videos
        }));
        // return database.ref("videos").once("value");
      })
      // .then(snapshot => {
      //   snapshot.forEach(function(childSnapshot) {
      //     var video = childSnapshot.val();
      //     videos.push(video);
      //   });
      //   videos = _.remove(videos, function(video) {
      //     return video.allowed === false || video.disabled === true;
      //   });
      //   console.log(videos);
      //   videos = videos.map(video => {
      //     let user = _.findIndex(users, function(user) {
      //       return user.userId === video.userId;
      //     });
      //     if (user !== -1) {
      //       return {
      //         ...video,
      //         user: users[user]
      //       };
      //     } else {
      //       return {
      //         ...video,
      //         user: users[0]
      //       };
      //     }
      //   });
      //   this.setState(prevState => ({
      //     ...prevState,
      //     loading: false,
      //     videos: videos
      //   }));
      // });
  }
  render() {
    return (
      <div className="mainVideoRequest mainDiv">
        <h1>VideoRequests</h1>
        <Link to="/admin">
          <button className="btn">Admin</button>
        </Link>
        <br />
        {!this.state.loading && (
          <div className="videoAccountCard">
            {this.state.videos.length !== 0
              ? this.state.videos.map((video, i) => {
                  if (video.allowed) {
                    return null;
                  }
                  return (
                    <div className="videoAccountCard_member" key={i}>
                      {video.disabled && (
                        <h3 className="messageIndecator">
                          This Vide Was Disabled By Admin
                        </h3>
                      )}
                      {video.hide && (
                        <h3 className="messageIndecator">
                          This Vide Was Hidden By Admin
                        </h3>
                      )}
                      <h2>Title</h2>
                      <span>{video.user.userTitle}</span>
                      <h2>Name</h2>
                      <span>{video.user.name}</span>
                      <h2>Email</h2>
                      <span>{video.user.email}</span>
                      <h2>Description Of User</h2>
                      <span>{video.user.userDescription}</span>
                      <video
                        src={video.path}
                        className="videoCardMedium videoCardMediumRequest"
                        controls
                      />
                      <div className="videoAccountCard_btnGroup">
                        <button
                          className="btn cardBtn"
                          onClick={() =>
                            this.showConfirmApprove(
                              video.videoId,
                              video.user.userId,
                              video.user
                            )
                          }
                        >
                          {" "}
                          {video.disabled &&
                            !video.allowed &&
                            !video.hide &&
                            "Enable"}
                          {!video.allowed &&
                            !video.hide &&
                            !video.disabled &&
                            "Approve"}
                          {video.hide && "Un Hide"}
                        </button>
                        <button
                          className="btn cardBtn"
                          onClick={() =>
                            this.showConfirmRemove(
                              video.videoId,
                              video.videoStorageRef
                            )
                          }
                        >
                          Remove
                        </button>
                        <button
                          className="btn cardBtn"
                          onClick={() => this.showModal(video)}
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  );
                })
              : "No Video Request Is Pending"}
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

const mapStateToProps = state => {
  return {
    videos: state.videos
  };
};
const mapDispatchToProps = dispatch => ({
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoRequest);
