import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../Loading/Loading";
import { startLoading, stopLoading, updateVideos } from "../../store/action";
import { Modal } from "antd";
import {
  removeVideoFromEverywhere,
  hideVideo,
  disableVideo
} from "../../Helper/videos";
import { success, errorMessage } from "../../Helper/Message";

class RecentVideos extends Component {
  state = {
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
        componentThis.props.startLoading();
        removeVideoFromEverywhere(videoObj)
          .then(() => {
            componentThis.removeVideoState(videoObj.videoId);
            componentThis.props.stopLoading();
            return success("Video Removed Successfully");
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
  showConfirmHide(videoId) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Hide This Video?",
      onOk() {
        componentThis.props.startLoading();
        hideVideo(videoId).then(() => {
          componentThis.removeVideoState(videoId);
          componentThis.props.stopLoading();
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
        componentThis.props.startLoading();
        disableVideo(videoId)
          .then(() => {
            componentThis.removeVideoState(videoId);
            componentThis.props.stopLoading();
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
  }

  componentWillMount() {
    this.props.startLoading();
  }
  render() {
    if (this.props.loading) {
      return <Loading />;
    }
    return (
      <div className="mainRecentVideos mainDiv">
        <h1>Recent Videos</h1>
        {!this.state.loading && (
          <div className="videoSectionMain">
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

                        {this.props.admin ? (
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
                              onClick={() => this.showConfirmRemove(videoObj)}
                            >
                              Remove Video
                            </button>
                            <button
                              className="btn"
                              onClick={() =>
                                this.showConfirmHide(videoObj.videoId)
                              }
                            >
                              Hide Video
                            </button>
                            <button
                              className="btn"
                              onClick={() =>
                                this.showConfirmDisable(videoObj.videoId)
                              }
                            >
                              Disable Video
                            </button>
                          </div>
                        ) : null}
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
    admin: state.admin,
    loading: state.loading,
    videos: state.videos
  };
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentVideos);
