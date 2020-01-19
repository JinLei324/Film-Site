import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { database } from "../../Helper/Firebase";
import { Modal } from "antd";
import Loading from "../Loading/Loading";
import { startLoading, stopLoading } from "../../store/action";
import { setVideos } from "../../store/action";
import _ from "lodash";
import { errorMessage, success } from "../../Helper/Message";

class FeaturedVideo extends Component {
  state = {
    videos: [],
    loading: false
  };
  componentDidMount() {
    this.props.stopLoading();
    let videosToSet = [];
    let featuredVideos = [];
    const componentThis = this;
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    database
      .ref("admin/featured/")
      .once("value")
      .then(value => {
        value.forEach(videoId => {
          featuredVideos.push(videoId.val());
        });

        componentThis.props.videos.forEach(function(video) {
          if (
            video.allowed &&
            video.disabled === false &&
            featuredVideos.indexOf(video.videoId) === -1
          ) {
            videosToSet.push(video);
          }
        });
        componentThis.setState({
          videos: videosToSet,
          loading: false
        });
      })

      .catch(e => {
        errorMessage(e.message);
      });
  }

  removeVideoState = id => {
    const componentThis = this;
    let videos = componentThis.state.videos;
    let videosUpdated = _.remove(videos, function(video) {
      return video.videoId !== id;
    });
    success("Video Is Added In The Featured List");
    componentThis.setState({
      videos: videosUpdated
    });
    componentThis.props.stopLoading();
  };
  adminFeaturedList = videoId => {
    const componentThis = this;
    database
      .ref(`admin/featured/${videoId}`)
      .set(videoId)
      .then(() => {
        componentThis.removeVideoState(videoId);
      })
      .catch(e => {
        errorMessage(e.message);
      });
  };
  showConfirmFeatured(videoId) {
    const componentThis = this;
    const confirm = Modal.confirm;
    confirm({
      title: "Do you Want To Featured This Vide?",
      onOk() {
        componentThis.props.startLoading();
        componentThis.adminFeaturedList(videoId);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
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
      <div className="mainFeaturedVideo mainDiv">
        <h1>Featured Videos</h1>
        <Link to="/admin">
          <button className="btn">Admin</button>
        </Link>
        <br />
        {!this.state.loading && (
          <div className="videoSectionMain">
            {this.state.videos.length !== 0
              ? this.state.videos.map((videoObj, i) => {
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
                      <button
                        className="btn"
                        onClick={() =>
                          this.showConfirmFeatured(videoObj.videoId, videoObj)
                        }
                      >
                        Featured This
                      </button>
                    </div>
                  );
                })
              : "No Video"}
          </div>
        )}
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
  stopLoading: () => dispatch(stopLoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeaturedVideo);
