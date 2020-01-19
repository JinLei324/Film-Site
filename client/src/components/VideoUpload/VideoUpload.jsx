import React, { Component } from "react";
import { Link } from "react-router-dom";
import FormField from "../FormField/FormField";
import uuid from "uuid";
import { startLoading, stopLoading, updateVideos } from "../../store/action";
import Loading from "../Loading/Loading";
import { storage, database } from "../../Helper/Firebase";
import { success, errorMessage } from "../../Helper/Message";
import { disableButton } from "../../Helper/buttonToggle";
import { getTextValue } from "../../Helper/getValue";
import { connect } from "react-redux";
import { getSeriesArr, urltoFile } from "../../Helper/videos";

let seriesId = uuid();
class VideoUpload extends Component {
  state = {
    loadingValue: 0,
    series: false,
    newSeriesName: "",
    seriesArr: [],
    selectedSeries: {},
    poster: "",
    generatingThumbnail: false,
    selectedPoster: ""
  };
  onSubmit = e => {
    e.preventDefault();
    const componentThis = this;
    const title = getTextValue("videoTitle");
    const videoFile = document.getElementById("videoFile").files[0];
    const description = getTextValue("videoDescription");
    const category = getTextValue("videoCategory");
    const genere = getTextValue("videoGenere");
    const rating = getTextValue("videoRating");
    const allowed = false;
    const disabled = false;
    const hide = false;
    let series = this.state.series;
    const videoId = uuid();
    const userId = this.props.user.userId;
    let poster = this.state.poster;
    let posterFile = "";
    if (poster === "") {
      return errorMessage("Please Select A Poster");
    }
    urltoFile(poster, "poster.png", "image/png").then(function(file) {
      posterFile = file;
      let path = "";
      const videoStorageRef = `videos/${videoId}${videoFile.name}`;
      const posterStorageRef = `posters/${videoId}poster.png`;
      let likes = JSON.stringify([]);
      const comments = JSON.stringify([]);
      disableButton("videoUploadBtn");
      const storageRef = storage.ref(videoStorageRef);
      if (series) {
        localStorage.setItem("newSeriesName", getTextValue("newSeries"));
      }
      componentThis.props.startLoading();
      let task = storageRef.put(videoFile);
      task.on(
        "state_changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          componentThis.setState({
            loadingValue: percentage.toFixed(1)
          });
        },
        function error(err) {
          console.log(err);
          errorMessage("Error Occured");
        },
        function completed(snapshot) {
          componentThis.setState({ loading: false });
          storageRef
            .getDownloadURL()
            .then(url => {
              path = url;
              seriesId =
                componentThis.state.series &&
                componentThis.state.selectedSeries.name !== undefined
                  ? componentThis.state.selectedSeries.seriesId
                  : seriesId;
              return database.ref("videos/" + videoId).set({
                title,
                description,
                videoStorageRef,
                videoId,
                series,
                seriesId,
                category,
                comments,
                genere,
                rating,
                userId,
                path,
                allowed,
                disabled,
                hide,
                likes
              });
            })
            .then(() => {
              if (componentThis.state.series) {
                componentThis.seriesFun(posterFile, posterStorageRef, videoId);
              } else {
                componentThis.uploadPoster(
                  posterFile,
                  posterStorageRef,
                  videoId
                );
              }
            })
            .catch(err => {
              console.log(err);
              errorMessage(err.message);
            });
        }
      );
    });
  };
  uploadPoster = (posterFile, posterStorageRef, videoId) => {
    const componentThis = this;
    let posterUploadTask = storage.ref(posterStorageRef).put(posterFile);
    posterUploadTask.on(
      "state_changed",
      function progress(snapshot) {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        componentThis.setState({
          loadingValue: percentage.toFixed(1)
        });
      },
      function error(err) {
        console.log(err);
        errorMessage("Error Occured");
      },
      function completed(snapshot) {
        componentThis.setState({ loading: false });
        storage
          .ref(posterStorageRef)
          .getDownloadURL()
          .then(urlPoster => {
            return database.ref(`videos/${videoId}`).update({
              poster: urlPoster,
              posterStorageRef
            });
          })
          .then(() => {
            componentThis.props.stopLoading();
            success("Uploaded Successfully");
            componentThis.props.history.push("/user/account");
          });
      }
    );
  };
  componentWillMount() {
    this.props.startLoading();
    database.ref("videos/").off();
  }
  componentWillUnmount() {
    const componentThis = this;
    database.ref("videos").on("value", function() {
      componentThis.props.updateVideos();
    });
  }
  componentDidMount() {
    let slice = 0;
    if (document.getElementById("videoFile")) {
      document
        .getElementById("videoFile")
        .addEventListener("change", function(event) {
          var file = event.target.files[0];
          var fileReader = new FileReader();
          fileReader.onload = function() {
            var blob = new Blob([fileReader.result], { type: file.type });
            var url = URL.createObjectURL(blob);
            var video = document.createElement("video");
            var timeupdate = function() {
              snapImage();
            };
            video.addEventListener("loadeddata", function() {
              slice = parseInt(video.duration) / 8;

              var intervalSnap = window.setInterval(() => {
                video.currentTime = slice;
                video.play();
                slice += slice;
                video.pause();
                if (slice > video.duration) {
                  clearInterval(intervalSnap);
                }
              }, 1000);
            });
            var snapImage = function() {
              var canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              canvas
                .getContext("2d")
                .drawImage(video, 0, 0, canvas.width, canvas.height);
              var image = canvas.toDataURL();
              var success = image.length > 100000;
              if (success) {
                var img = document.createElement("img");
                img.src = image;
                img.id = uuid();
                img.className = "thumbNailImg";
                img.onclick = () => componentThis.setPoster(image, img.id);
                document.getElementById("posterImageDiv").appendChild(img);
                URL.revokeObjectURL(url);
              }
              return success;
            };
            video.addEventListener("timeupdate", timeupdate);
            video.preload = "metadata";
            video.src = url;
            // Load video in Safari / IE11
            video.muted = true;
            video.playsInline = true;
            video.pause();
          };
          fileReader.readAsArrayBuffer(file);
        });
    }
    let seriesArr = [];
    const componentThis = this;
    this.props.stopLoading();
    getSeriesArr(this.props.user.userId)
      .then(seriesSnap => {
        seriesSnap.forEach(series => {
          seriesArr.push(series.val());
        });
        componentThis.setState(prevState => ({ ...prevState, seriesArr }));
      })
      .catch(err => {
        errorMessage(err.message);
        return err;
      });
  }
  changeSeries = () => {
    let series = getTextValue("videoCategory");
    if (series === "series") {
      this.setState(prevState => ({
        ...prevState,
        series: true
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        series: false
      }));
    }
  };
  seriesFun = (posterFile, posterStorageRef, videoId) => {
    const componentThis = this;
    if (this.state.selectedSeries.name !== undefined) {
      let updatedVideoArr = JSON.parse(this.state.selectedSeries.videos);
      updatedVideoArr = updatedVideoArr.concat([videoId]);
      database
        .ref(
          `series/${this.props.user.userId}/${
            this.state.selectedSeries.seriesId
          }`
        )
        .update({
          videos: JSON.stringify(updatedVideoArr)
        })
        .then(() => {
          componentThis.uploadPoster(posterFile, posterStorageRef, videoId);
        })
        .catch(err => {
          errorMessage(err.message);
        });
    } else {
      let newSeriesName = localStorage.getItem("newSeriesName");
      let videosArr = JSON.stringify([videoId]);
      database
        .ref(`series/${this.props.user.userId}/${seriesId}`)
        .set({
          name: newSeriesName,
          videos: videosArr,
          seriesId
        })
        .then(() => {
          componentThis.uploadPoster(posterFile, posterStorageRef, videoId);
        })
        .catch(err => {
          console.log(err);
          errorMessage(err.message);
        });
    }
  };
  onClickSeries = seriesObj => {
    this.setState(prevState => ({
      ...prevState,
      selectedSeries: seriesObj
    }));
  };
  setPoster = (poster, selectedPoster) => {
    this.setState(prevState => ({
      ...prevState,
      poster,
      selectedPoster
    }));
    var allImages = document.getElementsByTagName("img");

    for (var i = 0; i < allImages.length; i++) {
      // to open all photos in new tabs:
      // window.open(allImages[i].src, '_blank');
      if (allImages[i].id === selectedPoster) {
        allImages[i].className = "thumbNailImg active";
      } else {
        allImages[i].className = "thumbNailImg";
      }
    }
  };
  render() {
    if (this.props.loading) {
      return (
        <Loading
          loadingValue={
            this.state.loadingValue > 0 ? this.state.loadingValue : 0
          }
        />
      );
    }
    return (
      <div className="mainVideoUpload mainDiv">
        <h1>Upload Video</h1>
        <Link to="/">Home</Link>
        <form onSubmit={this.onSubmit} id="uploadForm">
          <FormField
            type="text"
            name="videoTitle"
            id="videoTitle"
            title="Title"
            required={true}
            placeholder="Title"
          />

          <FormField
            type="category"
            name="videoCategory"
            id="videoCategory"
            title="Category"
            onChange={this.changeSeries}
            required={true}
          />
          {this.state.series ? (
            <div>
              <FormField
                type="text"
                name="newSeries"
                id="newSeries"
                title="New Series"
                required={
                  this.state.selectedSeries.seriesId !== undefined
                    ? false
                    : true
                }
                placeholder="Title For New Series"
              />
              <h3>Or Select From Previous Series</h3>
              <div id="seriesMainDiv">
                {this.state.seriesArr.length !== 0
                  ? this.state.seriesArr.map((seriesObj, i) => {
                      return (
                        <div
                          key={i}
                          id={i}
                          className={
                            this.state.selectedSeries.seriesId ===
                            seriesObj.seriesId
                              ? "seriesDiv active"
                              : "seriesDiv"
                          }
                          onClick={() => this.onClickSeries(seriesObj)}
                        >
                          {seriesObj.name}
                        </div>
                      );
                    })
                  : "No Series"}
              </div>
            </div>
          ) : null}
          <FormField
            type="genere"
            name="videoGenere"
            id="videoGenere"
            title="Genere"
            required={true}
          />

          <FormField
            type="rating"
            name="videoRating"
            id="videoRating"
            title="Rating"
            required={true}
          />

          <FormField
            type="fileVideo"
            name="videoFile"
            id="videoFile"
            title="Upload Video"
            required={true}
          />
          <div id="posterImageDiv" />
          <br />
          {this.state.generatingThumbnail ? (
            <h3>Generating Thumbnails .....</h3>
          ) : null}
          <FormField
            type="description"
            name="videoDescription"
            id="videoDescription"
            title="Description"
            required={true}
            placeholder="Summary For The Video"
          />
          <button className="btn" id="videoUploadBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    loading: state.loading
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
)(VideoUpload);
