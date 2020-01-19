import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import { success, errorMessage } from "../../Helper/Message";
import { connect } from "react-redux";
import { database } from "../../Helper/Firebase";
import uuid from "uuid";
import { getAllUsers } from "../../Helper/user";
import { getSingleVideo } from "../../Helper/videos";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import PhotoEditDialog from "../Dialogs/PhotoEditDialog"
import PersonEditDialog from "../Dialogs/PersonEditDialog"


class UserIntro extends Component {
  state = {
    videoObj: {},
    userObj: {},
    liked: false
  };
  componentDidMount() {
    const componentThis = this;
    
    
  }
  
  render() {
    return (
      <Container>
      <div id="mainContainer"
        style = {{
          borderBottom: "1px solid #eee",
          marginRight: 50,
          marginLeft: 10,
          paddingLeft: 10
        }}
      >
        <div id="dscrContainer"
        style = {{
          display: "flex",
          borderBottom: "none"
        }}
        >
          <div id="pInfoContainer">
            <Link
              to={{
                pathname: `/user/info/${this.state.userObj.userId}`,
                userObj: `${JSON.stringify(this.state.userObj)}`,
                state: { fromDashboard: true }
              }} >
            
              <img
                className="dp"
                src={require("../../assets/VideoPlay/images/dp.png")}
                alt=""
                style={{width: 100}}
              />
                  
            </Link>
            <span
                  style = {{
                    display: "inline-block",
                    verticalAlign: "bottom"
                  }}
                >
              <PhotoEditDialog/>
            </span>
          </div>

          <Grid id="personInfo"
            style = {{
              marginLeft : 20
            }}
          >
            <Grid id="nameContainer">
              <Link
                to={{
                  pathname: `/user/info/${this.state.userObj.userId}`,
                  userObj: `${JSON.stringify(this.state.userObj)}`,
                  state: { fromDashboard: true }
                }} >
              
                <span 
                  id="uploaderName"
                  style = {{ 
                    fontSize: 20
                  }}  
                >
                  John Doe {this.state.userObj.userDescription}
                </span>
                <span
                  style = {{
                    display: "inline-block",
                  }}
                >
                  <PersonEditDialog/>
                </span>
                <p
                  style = {{
                    fontSize: 12,
                    color: "#888"
                  }}
                >
                  Co-Founder & CTO
                </p>
                    
              </Link>
            </Grid>
            <Typography id="tInfoContainer"
              style = {{
                marginTop: 10
              }}
            >
              <span>Kath Holden is an artist of the everyday.
                    Inspired by the world around her, 
                    Kath's creations are whimscial yet keenly observed,
                      and a far cry from the genteel museum pieces that her contemporaries are producing,
                      Kath Holden is an artist {this.state.userObj.userDescription}
              </span>
            </Typography>
          </Grid>

        </div>
        <Button
          variant="contained"
          color="primary"
          id="footer_contact_us_btn"
          style={{ 
            borderRadius: 30, 
            marginTop: 20,
            marginBottom: 20 
          }}>
          message
        </Button>

      </div>
      </Container>


      // <div classNameName="videoPlayerMain mainDiv">
      //   {/* You can use your custome video link here */}
      //   <h1> Video Player</h1>
      //   <div classNameName="playerDivMain">
      //     <div id="videoDiv">
      //       <video
      //         src={this.state.videoObj.path}
      //         width="100%"
      //         height="100%"
      //         controls
      //         controlsList="nodownload"
      //         poster={this.state.videoObj.poster}
      //       />
      //     </div>
      //     <div id="videoDescriptionDiv">
      //       <h1>{this.state.videoObj.title}</h1>
      //       <p>{this.state.videoObj.description}</p>
      //       <button
      //         classNameName="btn"
      //         onClick={this.likeVideo}
      //         disabled={this.state.liked ? true : false}
      //       >
      //         Like
      //       </button>
      //       <span id="heartVideo">
      //         <span id="heartVideoIcon">
      //           <i classNameName="fa fa-heart" />{" "}
      //         </span>
      //         <span id="likesCount">
      //           {this.state.videoObj.likes !== undefined
      //             ? this.state.videoObj.likes.length
      //             : 0}
      //         </span>
      //       </span>
      //       <div id="mainUserInfo">
      //         <span id="videoPlayPostedByHeading">User: </span>
      //         <Link
      //           to={{
      //             pathname: `/user/info/${this.state.userObj.userId}`,
      //             userObj: `${JSON.stringify(this.state.userObj)}`,
      //             state: { fromDashboard: true }
      //           }}
      //         >
      //           <span>{this.state.userObj.name}</span>
      //         </Link>
      //       </div>
      //       <div>
      //         {this.state.videoObj.series ? (
      //           <div id="seriesLink">
      //             <Link
      //               to={{
      //                 pathname: `/series/videos/${
      //                   this.state.videoObj.seriesId
      //                 }/${this.state.userObj.userId}`,
      //                 seriesId: this.state.videoObj.seriesId,
      //                 userId: this.state.userObj.userId,
      //                 state: { fromDashboard: true }
      //               }}
      //             >
      //               <span>Click To See All Series Videos</span>
      //             </Link>
      //           </div>
      //         ) : null}
      //       </div>
      //     </div>
      //   </div>
      //   {this.props.auth && !this.props.user.lock ? (
      //     <Comments
      //       videoId={this.state.videoObj.videoId}
      //       comments={
      //         this.state.videoObj.comments !== undefined
      //           ? this.state.videoObj.comments
      //           : []
      //       }
      //     />
      //   ) : null}
      // </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    user: state.currentUser,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(UserIntro);
