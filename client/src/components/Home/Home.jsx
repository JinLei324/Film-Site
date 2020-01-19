import React from "react";
import Featured from "./Featured";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Recommended from "./Recommended";

class Home extends React.Component {
  render() {
    return (
      <div
        style={{
          marginTop: 70,
          paddingTop: 40,
          paddingBottom: 40,
          paddingLeft: 60,
          paddingRight: 40
        }}
      >
        <Container>
          <h1
            style={{
              color: "#00AEEF",
              fontSize: 30,
              fontWeight: "bold",
              marginLeft: 10,
              marginBottom: 5
            }}
          >
            Welcome to FilmLyfe
          </h1>
          <p style={{ fontSize: 18, marginBottom: 30, marginLeft: 10 }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia.
          </p>
        </Container>
        {/* Adding Featured Section */}
        <Featured />
        <Container>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Container>
        <Recommended />
        <Container>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Container>
        <Recommended />
      </div>
    );
  }
}

export default Home;

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import { database } from "../../Helper/Firebase";
// import { startLoading, stopLoading, updateVideos } from "../../store/action";
// import { connect } from "react-redux";
// import { Modal } from "antd";
// import {
//   removeVideoFromEverywhere,
//   removeVideoFromFeature,
//   disableVideo
// } from "../../Helper/videos";
// import { success, errorMessage } from "../../Helper/Message";

// class Home extends Component {
//   state = {
//     featuredVideos: []
//   };
//   componentWillMount() {
//     this.props.startLoading();
//   }
//   removeVideoState = id => {
//     this.props.updateVideos();
//   };
//   showConfirmRemove(videoObj) {
//     const componentThis = this;
//     const confirm = Modal.confirm;
//     confirm({
//       title: "Do you Want To Remove This Video?",
//       onOk() {
//         componentThis.props.startLoading();
//         removeVideoFromEverywhere(videoObj)
//           .then(() => {
//             componentThis.props.stopLoading();
//             componentThis.removeVideoState(videoObj.videoId);
//             componentThis.props.updateVideos();
//             return success("Video Removed Successfully");
//           })
//           .catch(err => {
//             errorMessage(err.message);
//             console.log(err);
//           });
//       },
//       onCancel() {
//         console.log("Cancel");
//       }
//     });
//   }
//   showConfirmHide(videoId) {
//     const componentThis = this;
//     const confirm = Modal.confirm;
//     confirm({
//       title: "Do you Want To Hide This Video?",
//       onOk() {
//         componentThis.props.startLoading();
//         removeVideoFromFeature(videoId).then(() => {
//           componentThis.removeVideoState(videoId);
//           componentThis.props.stopLoading();
//           success("Video Hide Successfully");
//         });
//       },
//       onCancel() {
//         console.log("Cancel");
//       }
//     });
//   }

//   showConfirmDisable(videoId) {
//     const componentThis = this;
//     const confirm = Modal.confirm;
//     confirm({
//       title: "Do you Want To Disable This Video?",
//       onOk() {
//         componentThis.props.startLoading();
//         disableVideo(videoId)
//           .then(() => {
//             componentThis.removeVideoState(videoId);
//             componentThis.props.stopLoading();
//             success("Video Disabled Successfully");
//           })
//           .catch(err => {
//             console.log(err);
//           });
//       },
//       onCancel() {
//         console.log("Cancel");
//       }
//     });
//   }
//   componentDidMount() {
//     const componentThis = this;
//     database
//       .ref("admin/featured/")
//       .once("value")
//       .then(value => {
//         this.props.stopLoading();
//         let featuredVideos = [];
//         value.forEach(videoId => {
//           featuredVideos.push(videoId.val());
//         });
//         componentThis.setState(prevState => {
//           return {
//             featuredVideos
//           };
//         });
//       });
//   }
//   render() {
//     return (
//       <div className="mainHomeDiv mainDiv">
//         <h1> WellCome</h1>
//         <Link to="/recent">
//           <button className="btn">Recent Videos</button>
//         </Link>
//         <br />
//         <div className="videoSectionMain">
//           {/* Video are comming here apply styles from here */}
//           {this.state.featuredVideos.length !== 0
//             ? this.props.videos.map((videoObj, i) => {
//                 if (
//                   this.state.featuredVideos.indexOf(videoObj.videoId) !== -1
//                 ) {
//                   return (
//                     <div key={i} className="videoCardHome">
//                       <Link
//                         to={{
//                           pathname: `/play/${videoObj.videoId}`,
//                           videoObj: `${JSON.stringify(videoObj)}`,
//                           state: { fromDashboard: true }
//                         }}
//                       >
//                         <video
//                           src={videoObj.path}
//                           poster={videoObj.poster}
//                           id={i}
//                           className="videoTagHome"
//                           width="100%"
//                         />
//                       </Link>
//                       {this.props.admin ? (
//                         <div className="adminVideoBtnDiv">
//                           <Link
//                             to={{
//                               pathname: "/admin/poster",
//                               videoObj: `${JSON.stringify(videoObj)}`,
//                               state: { fromDashboard: true }
//                             }}
//                           >
//                             <button className="btn">Change Poster</button>
//                           </Link>
//                           <button
//                             className="btn"
//                             onClick={() => this.showConfirmRemove(videoObj)}
//                           >
//                             Remove Video
//                           </button>
//                           <button
//                             className="btn"
//                             onClick={() =>
//                               this.showConfirmHide(videoObj.videoId)
//                             }
//                           >
//                             Hide Video
//                           </button>
//                           <button
//                             className="btn"
//                             onClick={() =>
//                               this.showConfirmDisable(videoObj.videoId)
//                             }
//                           >
//                             Disable Video
//                           </button>
//                         </div>
//                       ) : null}
//                     </div>
//                   );
//                 }
//                 return null;
//               })
//             : "No Video"}
//         </div>
//         <br />
//         {this.props.loading && <i className="fa fa-circle-o-notch fa-spin" />}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     videos: state.videos,
//     admin: state.admin,
//     loading: state.loading
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   startLoading: () => dispatch(startLoading()),
//   stopLoading: () => dispatch(stopLoading()),
//   updateVideos: () => dispatch(updateVideos())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);
