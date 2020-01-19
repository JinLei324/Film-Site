import React, { Component } from "react";
import { database } from "../../Helper/Firebase";
import { Link } from "react-router-dom";
import { getAllVideos } from "../../Helper/videos";
import { errorMessage } from "../../Helper/Message";

var componentThis;
class SeriesVideos extends Component {
  state = {
    seriesObj: {},
    videos: [],
    loading: false
  };
  componentDidMount() {
    componentThis = this;
    let seriesId = this.props.location.seriesId;
    let userId = this.props.location.userId;
    if (!seriesId || !userId) {
      seriesId = window.location.pathname.split("/")[3];
      userId = window.location.pathname.split("/")[4];
    }
    this.setState(prevState => ({
      ...prevState,
      loading: true
    }));
    this.getSeriesVideoList(seriesId, userId);
  }

  getSeriesVideoList = (seriesId, userId) => {
    database
      .ref(`series/${userId}/${seriesId}`)
      .once("value")
      .then(snap => {
        let seriesObj = snap.val();
        componentThis.setState(prevState => ({
          ...prevState,
          seriesObj
        }));
        componentThis.getVideos(JSON.parse(seriesObj.videos));
      })
      .catch(err => {
        errorMessage(err.message);
        console.log(err);
      });
  };
  getVideos = videoArr => {
    let videosToSet = [];
    getAllVideos()
      .then(videos => {
        videoArr.map(videoId => {
          videos.forEach(videoObj => {
            if (videoObj.videoId === videoId && videoObj.allowed) {
              videosToSet.push(videoObj);
            }
          });
          return videoId;
        });
        componentThis.setState(prevState => ({
          ...prevState,
          videos: videosToSet,
          loading: false
        }));
      })
      .catch(err => {
        errorMessage(err.message);
        console.log(err);
      });
  };
  render() {
    return (
      <div className="mainSeriesVideos mainDiv">
        <h1>All SeriesVideos</h1>
        <h2>
          Series Name Is : {"   "}
          {this.state.seriesObj.name}
        </h2>
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

export default SeriesVideos;
