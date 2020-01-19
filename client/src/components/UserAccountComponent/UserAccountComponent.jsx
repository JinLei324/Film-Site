import React, { Component } from "react";
import { Link } from "react-router-dom";
import { success, errorMessage } from "../../Helper/Message";
import { database, storage } from "../../Helper/Firebase";
import { removeVideoFromFeature, removeFromSeries } from "../../Helper/videos";
import { Modal } from "antd";
import { updateVideos } from "../../store/action";
import { connect } from "react-redux";

class UserAccountComponent extends Component {
  state = {
    videos: [],
    focusedVideo: {},
    visible: false,
    loading: false
  };

  removeVideoState = id => {
    this.props.updateVideos();
  };
  showConfirmRemove(dbId, videoStorageRef, videoObj) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Remove This Vide?",
      onOk() {
        database
          .ref(`videos/${dbId}`)
          .remove()
          .then(() => {
            return storage.ref(videoObj.videoStorageRef).delete();
          })
          .then(() => {
            if (videoObj.series) {
              return removeVideoFromFeature(dbId).then(() => {
                return removeFromSeries(
                  videoObj.userId,
                  videoObj.seriesId,
                  videoObj.videoId
                );
              });
            }
            return removeVideoFromFeature(dbId);
          })
          .then(() => {
            return storage.ref(videoObj.posterStorageRef).delete();
          })
          .then(() => {
            componentThis.removeVideoState(dbId);
            componentThis.props.updateVideos();
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
  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount() {
    this.props.updateVideos();
  }
  editVideo = videoObj => {
    this.setState(prevState => ({
      ...prevState,
      focusedVideo: videoObj,
      visible: true
    }));
  };
  updateFocusedObj = (property, value) => {
    if (property === "title") {
      this.setState(prevState => ({
        ...prevState,
        focusedVideo: {
          ...prevState.focusedVideo,
          title: value
        }
      }));
    } else if (property === "genere") {
      this.setState(prevState => ({
        ...prevState,
        focusedVideo: {
          ...prevState.focusedVideo,
          genere: value
        }
      }));
    } else if (property === "rating") {
      this.setState(prevState => ({
        ...prevState,
        focusedVideo: {
          ...prevState.focusedVideo,
          rating: value
        }
      }));
    } else if (property === "description") {
      this.setState(prevState => ({
        ...prevState,
        focusedVideo: {
          ...prevState.focusedVideo,
          description: value
        }
      }));
    } else {
      errorMessage("Invalid Property");
    }
  };
  editVideoForm = e => {
    const componentThis = this;
    e.preventDefault();
    database
      .ref(`videos/${this.state.focusedVideo.videoId}`)
      .update({
        ...this.state.focusedVideo
      })
      .then(() => {
        success("Video Updated Successfully");
        componentThis.setState(prevState => ({
          ...prevState,
          visible: false
        }));
      })
      .catch(err => {
        console.log(err);
        errorMessage(err.message);
      });
  };
  render() {
    return (
      <div className="mainUserAccountComponentDiv mainDiv">
        <h1>Name : {this.props.user.name}</h1>
        <h2>
          Account Status {this.props.user.allowed ? "Allowed" : "Pending"}
        </h2>
        <Link to="/user/messages">
          <button className="btn">
            Inbox {this.props.user.newMessage ? <sup>*</sup> : null}
          </button>
        </Link>
        <br />
        <Link to="/user/notifications">
          <button className="btn">
            Notifications{" "}
            {this.props.user.newNotification ? <sup>*</sup> : null}
          </button>
        </Link>
        <h2>All Videos Posted By You</h2>
        {!this.state.loading && (
          <div id="videoSectionMain">
            {this.props.videos.length !== 0
              ? this.props.videos.map((videoObj, i) => {
                  if (videoObj.userId === this.props.user.userId) {
                    return (
                      <div key={i} className="videoCardHome">
                        <h3>Video Status</h3>
                        <span>
                          {videoObj.allowed ? "Allowed" : "Not Allowed"}
                        </span>
                        <Link
                          to={{
                            pathname: `/play/${videoObj.videoId}`,
                            videoObj: `${JSON.stringify(videoObj)}`,
                            state: { fromDashboard: true }
                          }}
                        >
                          <video
                            src={videoObj.path}
                            id={i}
                            className="videoTagHome"
                            poster={videoObj.poster}
                            width="100%"
                          />
                        </Link>
                        <button
                          className="btn"
                          onClick={() => {
                            this.showConfirmRemove(
                              videoObj.videoId,
                              videoObj.videoStorageRef,
                              videoObj
                            );
                          }}
                        >
                          Delete
                        </button>

                        <button
                          className="btn"
                          onClick={() => {
                            this.editVideo(videoObj);
                          }}
                        >
                          Edit Details
                        </button>
                      </div>
                    );
                  }
                  return null;
                })
              : "No Video"}
          </div>
        )}
        {this.state.loading && <i className="fa fa-circle-o-notch fa-spin" />}
        <Modal
          title="Edit Video"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <form
            onSubmit={this.editVideoForm}
            className="mainFormField"
            id="editVideoForm"
          >
            <label>
              Title
              <input
                type="text"
                value={this.state.focusedVideo.title}
                required={true}
                onChange={e => this.updateFocusedObj("title", e.target.value)}
              />
            </label>

            <label>
              Genere
              <select
                onChange={e => this.updateFocusedObj("genere", e.target.value)}
              >
                <option value={this.state.focusedVideo.genere}>
                  {this.state.focusedVideo.genere &&
                    this.state.focusedVideo.genere.toUpperCase()}{" "}
                  (Current)
                </option>
                <option value="comedy">COMEDY</option>
                <option value="documentry">Documentry</option>
                <option value="drama">DRAMA</option>
                <option value="sci-fi">sci-fi</option>
                <option value="horror">horror</option>
                <option value="romance">romance</option>
                <option value="action">action</option>
                <option value="thriller">thriller</option>
                <option value="crime">crime</option>
                <option value="adventure">adventure</option>
                <option value="fantasy">fantasy</option>
              </select>
            </label>

            <label>
              Rating
              <select
                onChange={e => this.updateFocusedObj("rating", e.target.value)}
              >
                <option value={this.state.focusedVideo.rating}>
                  {this.state.focusedVideo.rating &&
                    this.state.focusedVideo.rating.toUpperCase()}{" "}
                  (Current)
                </option>
                <option value="nc-17">NC-17</option>
                <option value="r">R</option>
                <option value="pg-13">PG-13</option>
                <option value="pg">PG</option>
                <option value="g">G</option>
              </select>
            </label>
            <label>
              Description
              <textarea
                type="file"
                maxLength="250"
                value={this.state.focusedVideo.description}
                onChange={e =>
                  this.updateFocusedObj("description", e.target.value)
                }
              />
            </label>
            <button className="btn modalFormBtn" type="submit">
              Save Changes
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    videos: state.videos
  };
};

const mapDispatchToProps = dispatch => ({
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccountComponent);
