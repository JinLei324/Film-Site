import React from "react";
import Featured from "./Featured";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Recommended from "./Recommended";

class CategoryResult extends React.Component {
  render() {
    console.log(this.props);
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
            {window.location.pathname.split("/")[2].toUpperCase()}
          </h1>
          <p style={{ fontSize: 18, marginBottom: 30, marginLeft: 10 }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia.
          </p>
        </Container>
        <Featured />
        <Container>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Container>
        <Recommended />
        {/* <Container>
          <Divider style={{ marginTop: 20, marginBottom: 20 }} />
        </Container>
        <Recommended /> */}
      </div>
    );
  }
}

export default CategoryResult;

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { startLoading, stopLoading } from "../../store/action";
// import { Link } from "react-router-dom";

// class CategoryResult extends Component {
//   state = {
//     videos: [],
//     loading: false,
//     category: "",
//     empty: true
//   };
//   componentDidMount() {
//     this.setState(prevState => ({
//       ...prevState,
//       loading: true,
//       category: window.location.pathname.split("/")[2]
//     }));
//     this.setState({
//       loading: false
//     });
//     this.props.stopLoading();
//   }
//   componentWillMount() {
//     this.props.startLoading();
//   }
//   render() {
//     return (
//       <div className="mainCategoryResult mainDiv">
//         {/* // Categories results will be displayed here */}
//         <h1>{window.location.pathname.split("/")[2].toUpperCase()}</h1>
//         {!this.state.loading && (
//           <div className="videoSectionMain">
//             {this.props.videos.length !== 0
//               ? this.props.videos.map((videoObj, i) => {
//                   if (
//                     videoObj.allowed &&
//                     videoObj.genere === this.state.category &&
//                     videoObj.disabled === false
//                   ) {
//                     if (this.state.empty) {
//                       this.setState({
//                         empty: false
//                       });
//                     }
//                     return (
//                       <div key={i} className="videoCardHome">
//                         <Link
//                           to={{
//                             pathname: `/play/${videoObj.videoId}`,
//                             videoObj: `${JSON.stringify(videoObj)}`,
//                             state: { fromDashboard: true }
//                           }}
//                         >
//                           <video
//                             src={videoObj.path}
//                             poster={videoObj.poster}
//                             id={i}
//                             className="videoTagHome"
//                             width="100%"
//                           />
//                         </Link>
//                         {/* <label htmlFor={i}>{videoObj.title}</label> */}
//                       </div>
//                     );
//                   }
//                   return null;
//                 })
//               : null}
//             {this.state.empty && "No Videos"}
//           </div>
//         )}
//         {this.props.loading && <i className="fa fa-circle-o-notch fa-spin" />}
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     loading: state.loading,
//     videos: state.videos
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   startLoading: () => dispatch(startLoading()),
//   stopLoading: () => dispatch(stopLoading())
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(CategoryResult);
