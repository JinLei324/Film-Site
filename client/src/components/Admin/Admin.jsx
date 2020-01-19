import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";
import { success, errorMessage } from "../../Helper/Message";
import Loading from "../Loading/Loading";
import { startLoading, stopLoading, updateVideos } from "../../store/action";
import {
  removeVideoFromEverywhere,
  hideVideo,
  disableVideo
} from "../../Helper/videos";
import { setVideos } from "../../store/action";

class Admin extends Component {
  state = {
    videos: [],
    loading: false,
    empty: true
  };
  removeVideoState = id => {
    this.props.updateVideos();
  };
  showConfirmRemove(videoObj) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Remove This Video?",
      onOk() {
        removeVideoFromEverywhere(videoObj)
          .then(() => {
            componentThis.removeVideoState(videoObj.videoId);
            return success("Video Removed Successfully");
          })
          .catch(err => {
            console.log(err);
            errorMessage(err.message);
          });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  showConfirmHide(videoId) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Hide This Video?",
      onOk() {
        hideVideo(videoId).then(() => {
          componentThis.removeVideoState(videoId);
          success("Video Hide Successfully");
        });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  showConfirmDisable(videoId) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Disable This Video?",
      onOk() {
        disableVideo(videoId)
          .then(() => {
            componentThis.removeVideoState(videoId);
            success("Video Disabled Successfully");
          })
          .catch(err => {
            errorMessage(err.message);
            console.log(err);
          });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }
  componentDidMount() {
    this.props.stopLoading();
    // let videos = [];
    // this.setState(prevState => ({
    //   ...prevState,
    //   loading: true
    // }));
    // database
    //   .ref("videos/")
    //   .once("value")
    //   .then(function(snapshot) {
    //     return snapshot.forEach(function(childSnapshot) {
    //       var video = childSnapshot.val();
    //       if (video.allowed && video.disabled === false) {
    //         videos.push(video);
    //       }
    //     });
    //   })
    //   .then(() => {
    //     this.props.setVideos(videos);
    //     this.setState({
    //       videos,
    //       loading: false
    //     });
    //   });
    this.setState({
      videos: this.props.videos
    });
  }
  componentWillMount() {
    this.props.startLoading();
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className="mainAdmin mainDiv">
        <h1>Admin </h1>
        <Link to="/admin/accounts">
          <button className="btn">Accounts</button>
        </Link>
        <Link to="/admin/videos">
          <button className="btn">Videos</button>
        </Link>
        <Link to="/admin/featured">
          <button className="btn">Featured</button>
        </Link>
        <br />
        <h3>All Allowed Videos</h3>
        <br />
        {!this.state.loading && (
          <div id="videoSectionMain">
            {this.props.videos.length !== 0
              ? this.props.videos.map((videoObj, i) => {
                  if (videoObj.allowed && videoObj.disabled === false) {
                    if (this.state.empty) {
                      this.setState({
                        empty: false
                      });
                    }
                    return (
                      <div key={i} className="videoCardHome">
                        <Link
                          to={{
                            pathname: `/play/${videoObj.videoId}`,
                            videoObj: `${JSON.stringify(videoObj)}`,
                            state: { fromDashboard: true }
                          }}
                        >
                          <video
                            src={videoObj.path}
                            poster={videoObj.poster}
                            id={i}
                            className="videoTagHome"
                            width="100%"
                          />
                        </Link>
                        <div className="adminVideoBtnDiv">
                          <Link
                            to={{
                              pathname: "/admin/poster",
                              videoObj: `${JSON.stringify(videoObj)}`,
                              state: { fromDashboard: true }
                            }}
                          >
                            <button className="btn">Change Poster</button>
                          </Link>
                          <button
                            className="btn"
                            onClick={() =>
                              this.showConfirmRemove(
                                videoObj.videoId,
                                videoObj.videoStorageRef
                              )
                            }
                          >
                            Remove Video
                          </button>
                          <button
                            className="btn"
                            onClick={() =>
                              this.showConfirmDisable(videoObj.videoId)
                            }
                          >
                            Disable Video
                          </button>
                          <button
                            className="btn"
                            onClick={() =>
                              this.showConfirmHide(videoObj.videoId)
                            }
                          >
                            Hide Video
                          </button>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              : null}
          </div>
        )}
        {this.state.empty && "No Video"}
        {this.state.loading && <i className="fa fa-circle-o-notch fa-spin" />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    videos: state.videos,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => ({
  setVideos: videos => dispatch(setVideos(videos)),
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
