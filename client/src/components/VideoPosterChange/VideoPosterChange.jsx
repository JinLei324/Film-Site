import React, { Component } from "react";
import { database, storage } from "../../Helper/Firebase";
import { success, errorMessage } from "../../Helper/Message";
import { urltoFile } from "../../Helper/videos";
import FormField from "../FormField/FormField";
import { updateVideos } from "../../store/action";
import { connect } from "react-redux";

class VideoPosterChange extends Component {
  state = {
    videoObj: {},
    loading: false,
    loadingValue: 0
  };
  componentDidMount() {
    let videoObjFromStorage = localStorage.getItem("videoObj");
    if (this.props.location.videoObj) {
      let videoObj = JSON.parse(this.props.location.videoObj);
      this.setState({
        videoObj
      });
      localStorage.setItem("videoObj", this.props.location.videoObj);
    } else {
      let videoObj = JSON.parse(videoObjFromStorage);
      this.setState({
        videoObj
      });
    }

    document
      .getElementById("videoPoster")
      .addEventListener("change", function(event) {
        var file = event.target.files[0];
        var imageFileReader = new FileReader();
        imageFileReader.onload = function() {
          var img = document.createElement("img");
          img.src = imageFileReader.result;
          img.id = "posterFile";
          document.getElementById("posterImageDiv").appendChild(img);
        };
        imageFileReader.readAsDataURL(file);
      });
  }
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
            success("Uploaded Successfully");
            componentThis.setState({
              loading: false
            });
            componentThis.props.updateVideos();
            componentThis.props.history.push("/admin");
          });
      }
    );
  };
  onSubmitPosterForm = e => {
    e.preventDefault();
    const componentThis = this;
    let poster = document.getElementById("posterFile").src;
    this.setState({
      loading: true
    });
    const posterStorageRef = `posters/${
      componentThis.state.videoObj.videoId
    }poster.png`;
    urltoFile(poster, "poster.png", "image/png").then(file => {
      return componentThis.uploadPoster(
        file,
        posterStorageRef,
        this.state.videoObj.videoId
      );
    });
  };
  render() {
    return (
      <div className="mainVideoPosterChange mainDiv">
        <h1>Main VideoPosterChange Component</h1>
        <div id="posterImageDiv" />
        {this.state.loading ? `${this.state.loadingValue}% Uploaded` : null}
        <form onSubmit={this.onSubmitPosterForm}>
          <FormField
            type="fileImage"
            name="videoPoster"
            id="videoPoster"
            title="Upload Poster"
            required={true}
          />
          <button className="btn">Change Poster</button>
        </form>
        <div id="adminPosterChangePlayer">
          <video
            src={this.state.videoObj.path}
            width="100%"
            height="100%"
            controls
            poster={this.state.videoObj.poster}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateVideos: () => dispatch(updateVideos())
});

export default connect(
  null,
  mapDispatchToProps
)(VideoPosterChange);
